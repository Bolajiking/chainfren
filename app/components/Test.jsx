'use client'
import useBox from './utils/useBox'
const Test = ({blog}) => {
  function hover(e) {

    e.target.style.backgroundColor='#FFFFFF02'
    const reverseColor=setTimeout(()=>{
      e.target.style.backgroundColor='transparent'
    },600)
  }

  return (
    <div className='absolute top-0 left-0 w-full  flex '>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
        </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] box-gradient one relative transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
        </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''} box-gradient  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
      </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] box-gradient three relative transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px]  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] box-gradient five relative transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] box-gradient six relative transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
  </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] box-gradient eight relative transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
 </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="border-[1px] transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-80':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-60':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-40':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog? 'opacity-20':''}  transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`border-[1px] ${blog&& 'opacity-5'} transition duration-300 ease-linear  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
    </div>
  )
}

export default Test