import '@/app/ui/global.css'
import SideNav from '@/app/ui/dashboard/sidenav'

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex w-full justify-center gap-5">
          <div className="w-[15%]">
            <SideNav />
          </div>
          <div className="w-[75%]">{children}</div>
        </main>
      </body>
    </html>
  )
}
