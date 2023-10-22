'use client'

const Background= ({animation}) => {
  function hover(e) {

    e.target.style.backgroundColor='#FFFFFF02'
    const reverseColor=setTimeout(()=>{
      e.target.style.backgroundColor='transparent'
    },600)
  }

  return (
    <div className='absolute top-0 left-0 w-full  flex '>
        <div className="w-full flex-col flex">
        <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ${animation && 'box-gradient one'} ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''} ${animation && 'box-gradient one'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
        </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px]  duration-300 ease-linear relative   border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation && 'box-gradient two'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={`   ${animation? 'opacity-20':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
        </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>   
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''} ${animation && 'box-gradient one'}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
      </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className={`    transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation && 'box-gradient four'}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] ${animation&& 'opacity-5'} duration-300 ${animation && 'box-gradient one'} ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>

            </div>
        <div className="w-full flex-col flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className="  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden ${animation? 'opacity-20':''} border-[1px] duration-300 ${animation && 'box-gradient four'} ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col hidden sm:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col hidden sm:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`    transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ${animation && 'box-gradient one'} ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ${animation && 'box-gradient two'} ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col hidden sm:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
            </div>
        <div className="w-full flex-col hidden sm:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''} ${animation && 'box-gradient four'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col hidden sm:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={ `transition md:hidden border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px]  duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
         <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} ${animation && 'box-gradient one'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>  
           </div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className={`   transition border-[1px] ${animation && 'box-gradient one'}  duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300  ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw]  sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'}  transition border-[1px] duration-300 ease-linear relative border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
   </div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] ${animation && 'box-gradient four'} duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
  </div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`    transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
 </div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
</div>
        <div className="w-full flex-col hidden md:flex">
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={`   transition border-[1px] ${animation && 'box-gradient two'}  duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className=" transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]"></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-80':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-60':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-40':''}   transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation? 'opacity-20':''}  transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
          <div onMouseEnter={(e)=>hover(e)} className={` ${animation&& 'opacity-5'} ${animation && 'box-gradient one'} transition border-[1px] duration-300 ease-linear relative  border-[#FFFFFF07] w-[20vw] h-[20vw] sm:w-[10vw] sm:h-[10vw] md:w-[5.88234vw] md:h-[5.88234vw]`}></div>
   </div>
    </div>
  )
}

export default Background