import './globals.css'
import ContextProvider from './components/utils/Provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="antialiased" style={{ fontFamily: '"Inter Display", "Inter", sans-serif' }}>
        <ContextProvider>
          {children}
        </ContextProvider>
      </body>
    </html>
  )
}
