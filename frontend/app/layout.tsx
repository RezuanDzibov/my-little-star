import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from './Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Little Star',
  icons: {
    icon: '/static/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-tl from-[#C1D2DC] via-[#B296FF] to-[#A18DCE]`}>
        <Nav/>
        {children}
      </body>
    </html>
  )
}