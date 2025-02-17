import HeadDash from "../components/HeadDash";
import { Inter } from "next/font/google";
import "../globals.css";



const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>

        <HeadDash/>
        {children}

      
      </body>
    </html>
  )
}
