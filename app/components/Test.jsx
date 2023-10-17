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
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''} ${blog && 'box-gradient one'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
        </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px]  duration-300 ease-linear relative   border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog && 'box-gradient two'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`   ${blog? 'opacity-20':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
        </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''} ${blog && 'box-gradient one'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
      </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className={`    transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog && 'box-gradient four'}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`    transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ${blog && 'box-gradient two'} ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''} ${blog && 'box-gradient four'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px]  duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} ${blog && 'box-gradient one'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className={`   transition border-[1px] ${blog && 'box-gradient one'}  duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] ${blog && 'box-gradient four'} duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
  </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`    transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
 </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`   transition border-[1px] ${blog && 'box-gradient two'}  duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-40':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${blog&& 'opacity-5'} ${blog && 'box-gradient one'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] W-[5.88234vw] h-[5.88234vw]`}></div>
   </div>
    </div>
  )
}

export default Test