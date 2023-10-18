import React from 'react'
import { SwiperComponent } from './SwiperComponent'

// import "swiper/swiper.min.css";

const PricingTable = () => {
    const pricing = {
        free : {
          tick : [
            "6 Reels",
            "1 Influencer",
            "Personalized Branding",
            "Video Editing",
            "Production",
            "Script Writing",
            "Content Research",
          ],
          wrong : [
            "Carousels",
            "Content Strategy",
            "Graphic Designing",
            "Account Manager",
            "Dedicated Team",
            "Meme Marketing",
            "Daily Stories",
          ]
        },
        starter : {
          tick : [
            "8 Reels",
            "1 Influencer",
            "Personalized Branding",
            "Video Editing",
            "Production",
            "Script Writing",
            "Content Research",
          ],
          wrong : [
            "Carousels",
            "Content Strategy",
            "Graphic Designing",
            "Account Manager",
            "Dedicated Team",
            "Meme Marketing",
            "Daily Stories",
          ]
        },
        premium : {
          tick : [
            "8 Reels",
            "1 Influencer",
            "Personalized Branding",
            "Video Editing",
            "Production",
            "Script Writing",
            "Content Research",
          ],
          wrong : [
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

      
  return (
    <div>PricingTable

<SwiperComponent/>
    </div>
  )
}

export default PricingTable