'use client'
import Nav2 from "../components/Nav2"
import { useGlobalContext } from "../components/utils/Provider"

export default function RootLayout({ children }) {
 const{dark}= useGlobalContext()
    return (
            <div className={`${dark?"dark":""} transition-all`}>
          <Nav2 />

          {children}

            </div>

    )
  }