import Nav from "../components/Nav"
import Subscribe from "../components/Subscribe"
import Footer from "../components/Footer"
export default function RootLayout({ children }) {
    return (
            <>
          <Nav />
          {children}
          <Subscribe />
      <Footer />
      </>

    )
  }
  