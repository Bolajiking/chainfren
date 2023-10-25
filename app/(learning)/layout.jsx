import Nav2 from "../components/Nav2"
import Sidebar from "../components/Sidebar"
export default function RootLayout({ children }) {
    return (
            <>
          <Nav2 />

          {children}

            </>

    )
  }