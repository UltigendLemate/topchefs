// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';

export  const SwiperComponent = () => {
  return (
    <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          freeMode={true}
          // loop={true}
          grabCursor={true}
          breakpoints={{
            200: {
              slidesPerView: 1.6,
            },
            768: {
              slidesPerView: 3,
            },
          }}
          // loop={true}
          // centeredSlides= {true}
          modules={[FreeMode]}
          className=" w-full grid items-center  "
        >
          <SwiperSlide className="  ml-5 md:ml-0   w-full min-w-max my-5  flex flex-col justify-center items-center ">
            <div className=" px-4 py-4 sm:px-7  border-yellow-500  border-[6px] rounded-xl w-full  flex flex-col gap-4 ">
              <div className="grid gap-2">
                {/* <h3 className='text-base md:text-lg'>Content Creation</h3> */}
                <div className="flex gap-2 items-center">
                  <h2 className="text-2xl text-[19px] font-extrabold md:text-3xl">
                    Sky Rocket
                  </h2>

                </div>
                <p className="text-sm   md:text-base">
                  50,000 per month{" "}
                </p>
              </div>
              <div className="flex flex-col gap-2 md:gap-2.5 text-xs sm:text-sm md:text-base">
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">6 Reels</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">1 Influencer</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Carousels</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Personalized Branding</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Video Editing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Production</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Script Writing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Content Research</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Content Strategy</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Graphic Designing</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Account Manager</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Dedicated Team</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Meme Marketing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Daily Stories</p>
                </div>
                {/* <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Rs 5000 per additional reel</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Dedicated SMM & Team</p>
                </div> */}
              </div>

              <button className="bgGrad   rounded-xl px-5 py-2  font-extrabold">
                Book Call{" "}
                <img className="w-5 inline " src="/assets/right-arrow.svg" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className=" my-5  min-w-max flex flex-col justify-center items-center">
            <div className=" px-4 sm:px-7 py-4 border-yellow-500  border-[6px] rounded-xl  w-full   flex flex-col gap-4 ">
              <h4 className="bgGrad inline-block w-fit  py-1 px-3 text-xs sm:text-sm md:text-base md:font-semibold absolute top-2">
                Best For Startups
              </h4>
              <div className="grid gap-2">
                {/* <h3 className='text-base md:text-lg'>New Age Tech Marketing</h3> */}
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl text-[19px] font-extrabold md:text-3xl">
                    Moon Rocket
                  </h2>
                
                </div>
                <p className="text-sm   md:text-base">
                  75,000 per month
                </p>
              </div>
              <div className="flex flex-col gap-2 md:gap-2.5 text-xs sm:text-sm md:text-base">
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">12 Reels</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">1 Influencer</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Carousels</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Personalized Branding</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Video Editing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Production</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Script Writing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Content Research</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Content Strategy</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Graphic Designing</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Account Manager</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Dedicated Team</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Meme Marketing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Daily Stories</p>
                </div>
   
              </div>

              <button className="bgGrad rounded-2xl px-5 py-2  font-extrabold">
                Book Call{" "}
                <img className="w-5 inline " src="/assets/right-arrow.svg" />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="  min-w-max   my-5  flex flex-col justify-center items-center">
            <div className=" border-yellow-500  border-[6px]  px-4 py-4 sm:px-7  rounded-xl w-full  flex flex-col gap-4 ">
              <h4 className="bgGrad inline-block w-fit  py-1 px-3 text-xs md:text-sm md:font-semibold absolute top-2">
                Best For Big Companies
              </h4> 
              <div className="grid gap-2">
                {/* <h3 className='text-base md:text-lg'>Superhuman Creaors</h3> */}
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl text-[18px] font-extrabold md:text-3xl whitespace-nowrap">
                    Milky Way Rocket
                  </h2>

                
                </div>
                <p className="text-sm   md:text-base">
                  1,25,000 per month
                </p>
              </div>
              <div className="flex flex-col gap-2 md:gap-2.5 text-xs sm:text-sm md:text-base">
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">20 Reels</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">2 Influencers</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">4 Carousels</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Personalized Branding</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Video Editing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Production</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Script Writing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Content Research</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Content Strategy</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Graphic Designing</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Account Manager</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Dedicated Team</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Meme Marketing</p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/checked--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Daily Stories</p>
                </div>
                {/* <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Rs 5000 per additional reel</p>
                </div>

                <div className="flex gap-2">
                  <img
                    src="https://img.icons8.com/color/96/null/cancel--v1.png"
                    className="w-6 h-6"
                  />
                  <p className="">Dedicated SMM & Team</p>
                </div> */}
              </div>

              <button className="bgGrad  rounded-xl px-5 py-2  font-extrabold">
                Book Call{" "}
                <img
                  className="w-5 inline "
                  src="/assets/right-arrow.svg"
                />
              </button>
            </div>
          </SwiperSlide>

          <SwiperSlide className="w-[4vw] md:hidden">
            <div className="w-[4vw] "></div>
          </SwiperSlide>
        </Swiper>
  );
};