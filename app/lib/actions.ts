'use server'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function createInvoice(formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${rawFormData.customerId}, ${rawFormData.amount * 100}, ${
      rawFormData.status
    }, ${new Date().toISOString().split('T')[0]})
    `
    revalidatePath('/ui/dashboard/invoices')
    redirect('/ui/dashboard/invoices');
  } catch (error) {
    console.error('Error creating invoice:', error);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}