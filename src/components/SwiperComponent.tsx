/*eslint-disable*/
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { title, subtitle } from '~/components/primitives'
import { TickIcon, CrossIcon } from './icons';

// Import Swiper styles
import 'swiper/css';
import { Button,Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { profile } from 'console';

type Pricing = {
  free: PricingPlan,
  starter: PricingPlan,
  premium: PricingPlan,

}

type PricingPlan = {
  tick: string[],
  wrong: string[]
}
const pricing: Pricing = {
  free: {
    tick: [
      "6 Reels",
      "1 Influencer",
      "Personalized Branding",
      "Video Editing",
      "Production",
      "Script Writing",
      "Content Research",
    ],
    wrong: [
      "Carousels",
      "Content Strategy",
      "Graphic Designing",
      "Account Manager",
      "Dedicated Team",
      "Meme Marketing",
      "Daily Stories",
    ]
  },
  starter: {
    tick: [
      "8 Reels",
      "1 Influencer",
      "Personalized Branding",
      "Video Editing",
      "Production",
      "Script Writing",
      "Content Research",
    ],
    wrong: [
      "Carousels",
      "Content Strategy",
      "Graphic Designing",
      "Account Manager",
      "Dedicated Team",
      "Meme Marketing",
      "Daily Stories",
    ]
  },
  premium: {
    tick: [
      "8 Reels",
      "1 Influencer",
      "Personalized Branding",
      "Video Editing",
      "Production",
      "Script Writing",
      "Content Research",
    ],
    wrong: [
      "Carousels",
      "Content Strategy",
      "Graphic Designing",
      "Account Manager",
      "Dedicated Team",
      "Meme Marketing",
      "Daily Stories",
    ]
  }
}


type SwiperComponentProps = {
  genPay: (amount: number, plan: string) => Promise<void | never>;
  role: string;
};

export const SwiperComponent = ({ genPay, role }: SwiperComponentProps) => {
  const router = useRouter();

  const PricingKeys = Object.keys(pricing);
  console.log(role);

  // Not logged In   | GS => profile->auth | GS => profike ->auth | GS => profile ->auth
  // Free            | GS => profile    | GS => Pay      | GS => Pay
  // Starter         | CU => /contact   | CU => /contact | CU => /contact
  // Premium         | CU => /contact   | CU => /contact | CU => /contact

  const PayNow = (thisPlan : String)=>{ 
    console.log(thisPlan);
    if (thisPlan == "starter"){
      genPay(10,"Starter");
    }
    else if (thisPlan == "premium"){
      genPay(20,"Premium");
    }

    else { 
      router.push("/profile");
    }

  }

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
      className=" w-full grid items-center"
    >

      {PricingKeys.map((plan, index) =>
        <SwiperSlide key={index} className="  ml-5 md:ml-0   w-full min-w-max my-5  flex flex-col justify-center items-center ">
          <div className=" px-4 py-4 sm:px-7  border-yellow-500  border-[6px] rounded-xl w-full  flex flex-col gap-4 ">
            <div className="grid gap-2">
              {/* <h3 className='text-base md:text-lg'>Content Creation</h3> */}
              <div className="flex gap-2 items-center">
                <h3 className={title({ size: "md", color: "violet" })}>
                  <span className='capitalize'>{plan}</span>
                </h3>

                {/* animation icon? */}

              </div>
              <h5 className={subtitle({ size: "md" })}>
                50,000 per month
              </h5>
            </div>
            <div className="flex flex-col gap-2 md:gap-2.5 text-xs sm:text-sm md:text-base">
              {pricing[plan as keyof Pricing].tick?.map((item: string, index: number) =>
                <div className="flex gap-2" key={index}>

                  <TickIcon />
                  <p className="">{item}</p>

                </div>
              )}

              
              {pricing[plan as keyof Pricing].wrong?.map((item: string, index: number) =>
                <div className="flex gap-2" key={index}>

                  <CrossIcon />
                  <p className="">{item}</p>

                </div>
              )}






            </div>

            {/* {( role=="Premium")  ?  */}
            {(role=="Starter" || role=="Premium")  ? 
            <Button variant="shadow" className='' as={Link} href="/contact" color='secondary'  >
            Contact Us
          </Button> 
          : 
            
            <Button variant="shadow" className='' onClick={() => PayNow(plan)} color='secondary'  >
              Get Started
            </Button>
            }
          </div>
        </SwiperSlide>

      )}



      <SwiperSlide className="w-[4vw] md:hidden">
        <div className="w-[4vw] "></div>
      </SwiperSlide>
    </Swiper>
  );
};