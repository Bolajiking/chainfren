import './globals.css'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Nav from './components/Nav'
import Footer from './components/Footer'
const Fontspring=localFont({
  src:[
    {
      path: '../fonts/Fontspring-regular.otf',
      weight: '400',
      style:'regular'
    },
    {
      path: '../fonts/Fontspring-black.otf',
      weight: '900',
      style:'black'
    },
    {
      path: '../fonts/Fontspring-bold.otf',
      weight: '700',
      style:'bold'
    },
    {
      path: '../fonts/Fontspring-light.otf',
      weight: '300',
      style:'light'
    },
    {
      path: '../fonts/Fontspring-semibold.otf',
      weight: '600',
      style:'semibold'
    },
    {
      path: '../fonts/Fontspring-medium.otf',
      weight: '500',
      style:'medium'
    },
    {
      path: '../fonts/Fontspring-thin.otf',
      weight: '200',
      style:'thin'
    },
  ],variable:'--Fontspring'
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${Fontspring.className} `}>
        <Nav />
        {children}
    <Footer />

        </body>
    </html>
  )
}
