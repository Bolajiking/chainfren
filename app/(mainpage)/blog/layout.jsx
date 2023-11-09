'use client'
import Nav3 from '@/app/components/Nav3';
import Subscribe2 from '@/app/components/Subscribe2';
import Footer3 from '@/app/components/Footer3';
import { useGlobalContext } from '@/app/components/utils/Provider';
export default function RootLayout({ children }) {
  const {dark}=useGlobalContext()
  console.log(dark);
    return (
      <>
                  <Nav3 />
            <div className={`${dark?'dark':''}` }>
            {children}
            <Subscribe2 />
            <Footer3 />
      </div>
      </>
    )
  }