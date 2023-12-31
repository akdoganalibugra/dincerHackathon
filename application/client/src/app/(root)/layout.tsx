import { Providers } from '@/redux/providers';
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.min.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '3S Tracker',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer
          position="top-center"
          hideProgressBar
          autoClose={5000}
          closeButton={true}
          pauseOnHover
          theme="colored"
          limit={10}
        />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
