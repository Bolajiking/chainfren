import React from 'react'
import Background from '../../components/Background'
import Nav from '@/app/components/Nav'
import Subscribe from '@/app/components/Subscribe'
import Footer from '@/app/components/Footer'
const page = () => {
  return (
    <>
    <Nav />
    <div className="">
        <div className=" relative  overflow-hidden flex flex-col justify-center gap-6 text-white items-center py-16">
            <div className="mx-auto test absolute lg:top-[28rem] "></div>
            <Background animation={true} />
            <div className="text-[#ffffffa0] z-[1]">Contact Us</div>
            <div className="text-4xl md:text-5xl text-center z-[1] font-semibold">Let’s Dive into the Decentralized <br /> World Together</div>
            <button className='px-8 py-3 bg-[#40CBFF] z-[1] text-black rounded-3xl font-semibold'>Let’s Get Started</button>
        </div>
        <div className="bg-white font-serif">
            <div className="px-8 max-w-[1120px] text-black mx-auto">
                <div className="flex w-full mx-auto pt-6 pb-12 md:py-16 flex-col md:flex-row">
                    <div className="flex-[0.8]   text-5xl font-medium">
                       <div className="md2:w-[420px]">
                    We are always reachable via email & social media
                    </div>
                    </div>
                   <div className="flex-1 flex items-start flex-col gap-12 ">
                       <div className="text-3xl underline font-semibold mt-6 md:mt-0"><a href="mailto:info@chainfren.com">info@Chainfren.com</a></div>
                           <div className="flex md:flex-col md:items-start gap-8">
                               <div className="flex gap-8  items-center">
                               <div className="">
            <a href=""> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.9308 5.64136C17.6561 5.05646 16.2892 4.62553 14.8599 4.37872C14.8339 4.37396 14.8079 4.38586 14.7945 4.40967C14.6187 4.72235 14.4239 5.13026 14.2876 5.45088C12.7503 5.22074 11.221 5.22074 9.71527 5.45088C9.57887 5.12314 9.37707 4.72235 9.20048 4.40967C9.18707 4.38666 9.16107 4.37475 9.13504 4.37872C7.70659 4.62474 6.33963 5.05567 5.06411 5.64136C5.05307 5.64612 5.04361 5.65407 5.03732 5.66438C2.44449 9.53801 1.73421 13.3164 2.08265 17.048C2.08423 17.0663 2.09447 17.0837 2.10867 17.0948C3.81934 18.3511 5.47642 19.1138 7.10273 19.6193C7.12876 19.6273 7.15634 19.6177 7.1729 19.5963C7.55761 19.0709 7.90054 18.517 8.19456 17.9345C8.21192 17.9003 8.19535 17.8599 8.15989 17.8464C7.61594 17.64 7.098 17.3885 6.59977 17.1028C6.56037 17.0798 6.55721 17.0234 6.59347 16.9964C6.69831 16.9178 6.80318 16.8361 6.9033 16.7536C6.92141 16.7385 6.94665 16.7353 6.96794 16.7448C10.2411 18.2392 13.7846 18.2392 17.0191 16.7448C17.0404 16.7345 17.0657 16.7377 17.0846 16.7528C17.1847 16.8353 17.2895 16.9178 17.3952 16.9964C17.4314 17.0234 17.4291 17.0798 17.3897 17.1028C16.8914 17.394 16.3735 17.64 15.8288 17.8456C15.7933 17.8591 15.7775 17.9003 15.7949 17.9345C16.0952 18.5162 16.4381 19.0701 16.8157 19.5955C16.8315 19.6177 16.8599 19.6273 16.8859 19.6193C18.5201 19.1138 20.1772 18.3511 21.8879 17.0948C21.9028 17.0837 21.9123 17.0671 21.9139 17.0488C22.3309 12.7347 21.2154 8.98725 18.9568 5.66517C18.9513 5.65407 18.9419 5.64612 18.9308 5.64136ZM8.68335 14.7759C7.69792 14.7759 6.88594 13.8712 6.88594 12.7601C6.88594 11.649 7.68217 10.7443 8.68335 10.7443C9.69239 10.7443 10.4965 11.657 10.4807 12.7601C10.4807 13.8712 9.68451 14.7759 8.68335 14.7759ZM15.329 14.7759C14.3435 14.7759 13.5316 13.8712 13.5316 12.7601C13.5316 11.649 14.3278 10.7443 15.329 10.7443C16.338 10.7443 17.1421 11.657 17.1264 12.7601C17.1264 13.8712 16.338 14.7759 15.329 14.7759Z" fill="black"/>
</svg></a>

             </div>
             <div className="">
           <a href="http://x.com/chainfren"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.9525 7.91998C19.9647 8.0963 19.9647 8.27261 19.9647 8.45055C19.9647 13.8724 15.8371 20.1255 8.28966 20.1255V20.1223C6.06013 20.1255 3.8769 19.4869 2 18.2828C2.32419 18.3218 2.65001 18.3413 2.97664 18.3421C4.82429 18.3437 6.61913 17.7238 8.07272 16.5822C6.31688 16.5489 4.77717 15.404 4.23928 13.7327C4.85436 13.8513 5.48812 13.8269 6.09181 13.662C4.17753 13.2753 2.80033 11.5934 2.80033 9.64007C2.80033 9.6222 2.80033 9.60513 2.80033 9.58807C3.37071 9.90576 4.00934 10.0821 4.6626 10.1016C2.85964 8.89662 2.30388 6.49808 3.39265 4.6228C5.47593 7.18628 8.54966 8.74468 11.8493 8.90962C11.5186 7.48447 11.9703 5.99108 13.0364 4.98925C14.689 3.43572 17.2882 3.51535 18.8418 5.16719C19.7607 4.986 20.6415 4.64881 21.4475 4.17105C21.1412 5.12088 20.5001 5.9277 19.6437 6.4404C20.457 6.34452 21.2517 6.12677 22 5.79445C21.4491 6.61996 20.7552 7.33903 19.9525 7.91998Z" fill="black"/>
</svg></a> 
             </div>
             <div className="">
          <a href=""> <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.792 0.414829C18.6521 0.645893 19.3325 1.32626 19.5635 2.18633C19.9872 3.75244 20 7.00019 20 7.00019C20 7.00019 20 10.2608 19.5764 11.8141C19.3453 12.6741 18.665 13.3545 17.8049 13.5856C16.2516 14.0092 10 14.0092 10 14.0092C10 14.0092 3.74839 14.0092 2.19512 13.5856C1.33504 13.3545 0.654686 12.6741 0.42362 11.8141C0 10.248 0 7.00019 0 7.00019C0 7.00019 0 3.75244 0.410783 2.19917C0.641849 1.33909 1.32221 0.658735 2.18229 0.427671C3.73556 0.00404477 9.98716 -0.00878906 9.98716 -0.00878906C9.98716 -0.00878906 16.2388 -0.00878906 17.792 0.414829ZM13.1836 7.0002L7.99743 10.004V3.99635L13.1836 7.0002Z" fill="black"/>
</svg></a>

             </div>
                               </div>
                               <div className="flex gap-8 items-center">
                               <div className="">
            <a> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 4.32353V19.6765C21 20.0275 20.8606 20.3641 20.6123 20.6123C20.3641 20.8606 20.0275 21 19.6765 21H4.32353C3.97251 21 3.63586 20.8606 3.38765 20.6123C3.13944 20.3641 3 20.0275 3 19.6765V4.32353C3 3.97251 3.13944 3.63586 3.38765 3.38765C3.63586 3.13944 3.97251 3 4.32353 3H19.6765C20.0275 3 20.3641 3.13944 20.6123 3.38765C20.8606 3.63586 21 3.97251 21 4.32353ZM8.29412 9.88235H5.64706V18.3529H8.29412V9.88235ZM8.53235 6.97059C8.53375 6.77036 8.49569 6.57182 8.42035 6.3863C8.34502 6.20078 8.23387 6.03191 8.09328 5.88935C7.95268 5.74678 7.78537 5.6333 7.60091 5.5554C7.41646 5.47749 7.21846 5.43668 7.01824 5.43529H6.97059C6.5634 5.43529 6.17289 5.59705 5.88497 5.88497C5.59705 6.17289 5.43529 6.5634 5.43529 6.97059C5.43529 7.37777 5.59705 7.76828 5.88497 8.05621C6.17289 8.34413 6.5634 8.50588 6.97059 8.50588C7.17083 8.51081 7.37008 8.47623 7.55696 8.40413C7.74383 8.33202 7.91467 8.2238 8.0597 8.08565C8.20474 7.94749 8.32113 7.78212 8.40223 7.59897C8.48333 7.41582 8.52755 7.21848 8.53235 7.01824V6.97059ZM18.3529 13.2071C18.3529 10.6606 16.7329 9.67059 15.1235 9.67059C14.5966 9.6442 14.0719 9.75644 13.6019 9.9961C13.1318 10.2358 12.7328 10.5945 12.4447 11.0365H12.3706V9.88235H9.88235V18.3529H12.5294V13.8476C12.4911 13.3862 12.6365 12.9283 12.9339 12.5735C13.2313 12.2186 13.6567 11.9954 14.1176 11.9524H14.2182C15.06 11.9524 15.6847 12.4818 15.6847 13.8159V18.3529H18.3318L18.3529 13.2071Z" fill="black"/>
</svg></a>

             </div>
             <div className="">
          <a href="https://www.instagram.com/chainfren">  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C9.5556 3 9.2496 3.0102 8.2896 3.054C7.3314 3.0978 6.6768 3.2502 6.1044 3.4728C5.5044 3.6984 4.9602 4.0524 4.5102 4.5108C4.05253 4.96028 3.69831 5.5041 3.4722 6.1044C3.2508 6.6768 3.0978 7.332 3.054 8.2902C3.0108 9.2496 3 9.555 3 12C3 14.445 3.0102 14.7504 3.054 15.7104C3.0978 16.6686 3.2502 17.3232 3.4728 17.8956C3.6984 18.4956 4.0524 19.0398 4.5108 19.4898C4.96029 19.9475 5.50411 20.3017 6.1044 20.5278C6.6768 20.7498 7.3314 20.9022 8.2896 20.946C9.2496 20.9898 9.5556 21 12 21C14.4444 21 14.7504 20.9898 15.7104 20.946C16.6686 20.9022 17.3232 20.7498 17.8956 20.5272C18.4956 20.3016 19.0398 19.9476 19.4898 19.4892C19.9475 19.0397 20.3017 18.4959 20.5278 17.8956C20.7498 17.3232 20.9022 16.6686 20.946 15.7104C20.9898 14.7504 21 14.4444 21 12C21 9.5556 20.9898 9.2496 20.946 8.2896C20.9022 7.3314 20.7498 6.6768 20.5272 6.1044C20.3012 5.50384 19.947 4.95979 19.4892 4.5102C19.0397 4.05253 18.4959 3.69831 17.8956 3.4722C17.3232 3.2508 16.668 3.0978 15.7098 3.054C14.7504 3.0108 14.445 3 12 3ZM12 4.6218C14.403 4.6218 14.688 4.6308 15.6372 4.674C16.5144 4.7142 16.9908 4.86 17.3082 4.9842C17.7282 5.1468 18.0282 5.3424 18.3432 5.6568C18.6582 5.9718 18.8532 6.2718 19.0158 6.6918C19.1394 7.0092 19.2858 7.4856 19.326 8.3628C19.3692 9.312 19.3782 9.597 19.3782 12C19.3782 14.403 19.3692 14.688 19.326 15.6372C19.2858 16.5144 19.14 16.9908 19.0158 17.3082C18.8718 17.6991 18.6419 18.0528 18.3432 18.3432C18.0528 18.642 17.6992 18.8718 17.3082 19.0158C16.9908 19.1394 16.5144 19.2858 15.6372 19.326C14.688 19.3692 14.4036 19.3782 12 19.3782C9.5964 19.3782 9.312 19.3692 8.3628 19.326C7.4856 19.2858 7.0092 19.14 6.6918 19.0158C6.30087 18.8718 5.9472 18.6419 5.6568 18.3432C5.35811 18.0528 5.12828 17.6991 4.9842 17.3082C4.8606 16.9908 4.7142 16.5144 4.674 15.6372C4.6308 14.688 4.6218 14.403 4.6218 12C4.6218 9.597 4.6308 9.312 4.674 8.3628C4.7142 7.4856 4.86 7.0092 4.9842 6.6918C5.1468 6.2718 5.3424 5.9718 5.6568 5.6568C5.94716 5.35803 6.30085 5.12819 6.6918 4.9842C7.0092 4.8606 7.4856 4.7142 8.3628 4.674C9.312 4.6308 9.597 4.6218 12 4.6218Z" fill="black"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 15.003C11.6057 15.003 11.2152 14.9254 10.8508 14.7744C10.4865 14.6235 10.1554 14.4023 9.87658 14.1235C9.59773 13.8446 9.37653 13.5136 9.22561 13.1492C9.0747 12.7849 8.99702 12.3944 8.99702 12C8.99702 11.6057 9.0747 11.2152 9.22561 10.8508C9.37653 10.4865 9.59773 10.1554 9.87658 9.87659C10.1554 9.59774 10.4865 9.37654 10.8508 9.22562C11.2152 9.07471 11.6057 8.99703 12 8.99703C12.7965 8.99703 13.5603 9.31342 14.1235 9.87659C14.6866 10.4398 15.003 11.2036 15.003 12C15.003 12.7965 14.6866 13.5603 14.1235 14.1235C13.5603 14.6866 12.7965 15.003 12 15.003ZM12 7.37403C10.7731 7.37403 9.59649 7.86141 8.72895 8.72896C7.8614 9.5965 7.37402 10.7731 7.37402 12C7.37402 13.2269 7.8614 14.4036 8.72895 15.2711C9.59649 16.1387 10.7731 16.626 12 16.626C13.2269 16.626 14.4036 16.1387 15.2711 15.2711C16.1386 14.4036 16.626 13.2269 16.626 12C16.626 10.7731 16.1386 9.5965 15.2711 8.72896C14.4036 7.86141 13.2269 7.37403 12 7.37403ZM17.9718 7.29003C17.9718 7.58005 17.8566 7.85818 17.6515 8.06325C17.4465 8.26833 17.1683 8.38353 16.8783 8.38353C16.5883 8.38353 16.3102 8.26833 16.1051 8.06325C15.9 7.85818 15.7848 7.58005 15.7848 7.29003C15.7848 7.00002 15.9 6.72188 16.1051 6.51681C16.3102 6.31174 16.5883 6.19653 16.8783 6.19653C17.1683 6.19653 17.4465 6.31174 17.6515 6.51681C17.8566 6.72188 17.9718 7.00002 17.9718 7.29003Z" fill="black"/>
</svg></a> 

             </div>
             <div className="">
            <a href=""><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 12.0607C22 6.504 17.5233 2 12 2C6.47667 2 2 6.504 2 12.0607C2 17.0833 5.656 21.2453 10.4373 22V14.9693H7.89867V12.06H10.4373V9.844C10.4373 7.32267 11.93 5.92933 14.2147 5.92933C15.308 5.92933 16.4533 6.126 16.4533 6.126V8.602H15.1913C13.9493 8.602 13.5627 9.378 13.5627 10.174V12.0607H16.336L15.8927 14.9687H13.5627V22C18.344 21.2453 22 17.0833 22 12.0607Z" fill="black"/>
</svg></a> 

             </div>
                               </div>
                           </div>




                   </div>
               </div>
                <div className="flex w-full mx-auto pt-12 pb-6 flex-col md:flex-row gap-10 md:gap-0 md:py-16 ">
                    <div className="flex-[0.8]  text-5xl font-medium">or Text us</div>
                    <div className="flex-1"><a href="https://wa.me/2348160250508?text=Hi%20Chainfren"><button className='py-[10px] rounded-3xl px-8 bg-gradient-to-r from-[#40CBFF] to-[#40FFCC] text-primary font-semibold'>Say Hi!</button></a>
                </div>
                </div>
                {/* 
 */}
            </div>
        </div>
    </div>
    <Subscribe />
    <Footer />
    </>
  )
}

export default page
