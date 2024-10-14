'use client'
import Nav from '@/app/components/Nav';
import Subscribe2 from '@/app/components/Subscribe2';
import Footer3 from '@/app/components/Footer3';
import { useGlobalContext } from '@/app/components/utils/Provider';
export default function RootLayout({ children }) {
  const {dark}=useGlobalContext()
  console.log(dark);
    return (
      <>
                  <Nav />
            <div className={`${dark?'dark':''}` }>
            {children}
            <Subscribe2 />
            <Footer3 />
      </div>
      </>
    )
  }