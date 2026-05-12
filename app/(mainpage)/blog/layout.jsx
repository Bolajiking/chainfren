'use client'
import { useGlobalContext } from '@/app/components/utils/Provider';
export default function RootLayout({ children }) {
  const {dark}=useGlobalContext()
  console.log(dark);
    return (
      <>
            <div className={`${dark?'dark':''}` }>
            {children}
      </div>
      </>
    )
  }