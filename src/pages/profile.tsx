import React from 'react'
import DefaultLayout from '~/components/Layout/default'
import { useState, useEffect } from 'react';
import {Input, Select, SelectItem, Textarea, Tooltip} from "@nextui-org/react";
import { title, subtitle } from "~/components/primitives";
import {EditIcon, FacebookIcon, GlobeIcon, InstaIcon, LinkedinIcon, SnapchatIcon, TwitterIcon} from "~/components/icons";

const currentDesignation = [
  "Artisanal Baker",
  "Banquet Chef",
  "Catering Chef",
  "Catering Manager",
  "Celebrity Chef",
  "Chef de Cuisine",
  "Chef de Partie",
  "Consulting Chef",
  "Corporate Chef",
  "Culinary Consultant",
  "Culinary Director",
  "Culinary Instructor",
  "Culinary Producer",
  "Culinary Researcher",
  "Culinary Researcher",
  "Executive Chef",
  "Food Blogger",
  "Food Critic",
  "Food Stylist",
  "Garde Manger Chef",
  "Gourmet Chef",
  "Head Chef",
  "Hotel Chef",
  "Line Cook",
  "Master Chef",
  "Nutrition Chef",
  "Pastry Chef",
  "Pastry Sous Chef",
  "Personal Chef",
  "Plant-Based Chef",
  "Private Chef",
  "Research and Development Chef",
  "Restaurant Owner",
  "Saucier",
  "Sous Chef",
  "Teaching Chef",
  "Test Kitchen Chef",
  "Vegan Chef",
  ];

const cities = [
    "Agra",
    "Ahmedabad",
    "Amritsar",
    "Bangalore",
    "Bhopal",
    "Bhubaneswar",
    "Chandigarh",
    "Chennai",
    "Coimbatore",
    "Dehradun",
    "Gandhinagar",
    "Guwahati",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Jammu",
    "Kochi",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "New Delhi",
    "Patna",
    "Pune",
    "Raipur",
    "Ranchi",
    "Shimla",
    "Thiruvananthapuram",
    "Varanasi",
    "Visakhapatnam"
  ];

  const educationOptions = [
    "High School Diploma or Equivalent",
    "Associate's Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate or Ph.D."
  ];
  
  
  // Sort the array alphabetically
  cities.sort();
  


const Profile = () => {

  const [value, setvalue] = useState("9711091823")
  
  return (
    <DefaultLayout>

      {/* basic details  */}
            <form action="" className='font-mont mt-3  px-3 py-5 rounded-xl border border-gray-500 shadow-gray-600 -m-1 my-auto'>
          <h1 className={title({ size: "sm", color: "violet" })}>Basic Details <EditIcon className="text-default-500 inline w-7 h-7" /></h1> 
          
        <Input type="text" variant="underlined" label="Full Name" isDisabled  value={"chaitanya anand"} />
        <Input type="email" variant="underlined" label="Email" isDisabled  value={"chaitanya.anand@gmail.com"} description="This email will be shared in the magazines" />

        <Input type="text" variant="underlined" isDisabled  value={"9711091823"}  label="Phone Number"  /> 
        

        </form>

      {/* additional details  */}
        <form className='font-mont mt-10   px-3 py-5 rounded-xl border border-gray-500 shadow-gray-600 -m-1 my-auto'>
        <h1 className={title({ size: "sm", color: "blue" })}>Tell us more!</h1> 
        <Select 
            variant="underlined"
            label="Select your current designation" 
            className="max-w-xs" 
            
          >
            {currentDesignation.map((designation) => (
              <SelectItem key={designation} value={designation}>
                {designation}
              </SelectItem>
            ))}
          </Select>

        <Input type="text" variant="underlined"   description="Where are you working currently?"  label="Name of your Current Establishment or Restaurant"  /> 

        <Select 
            variant="underlined"
            label="City" 
            className="max-w-xs" 
            
          >
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </Select>

        <Select 
            variant="underlined"
            label="Highest level of education completed" 
            className="max-w-xs" 
            
          >
            {educationOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>

        

        </form>


      {/* starter plan details  */}
        <form className='font-mont mt-10 flex flex-col   px-3 py-5 rounded-xl border border-gray-500 shadow-gray-600 -m-1 my-auto'>
        <h1 className={title({ size: "sm", color: "cyan" })}>Enhance Your Profile</h1> 
        <h2 className={subtitle()}>This section is only avaiable to starter plan users!</h2>
        
        <Input type="text" variant="underlined"  label="Address"  /> 

        <Input type="number" variant="underlined"   description="How many years of culinary experience do you have?"  label="Experience (Number of years)"  /> 
        
        <Textarea
        minRows={1}
          label="Brief Introduction (max 50 words)"
          variant="underlined"
          className='mt-3'
        />

        <div className='grid grid-cols-2 gap-x-3 mt-3 '>
          
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Website" startContent={<GlobeIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Instagram" startContent={<InstaIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Facebook" startContent={<FacebookIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Twitter" startContent={<TwitterIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Snapchat" startContent={<SnapchatIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Linkedin" startContent={<LinkedinIcon/>}  /> 
        </div>
        

        

        </form>



      {/* premium plan details  */}
      {/* this is a copy  */}
        <form className='font-mont mt-10 flex flex-col   px-3 py-5 rounded-xl border border-gray-500 shadow-gray-600 -m-1 my-auto'>
        <h1 className={title({ size: "sm", color: "yellow" })}>Showcase Your Expertise!</h1> 
        <h2 className={subtitle()}>This section is only avaiable to premium plan users!</h2>
        
        <Input type="text" variant="underlined"  label="Address"  /> 

        <Input type="number" variant="underlined"   description="How many years of culinary experience do you have?"  label="Experience (Number of years)"  /> 
        
        <Textarea
        minRows={1}
          label="Brief Introduction (max 50 words)"
          variant="underlined"
          className='mt-3'
        />

        <div className='grid grid-cols-2 gap-x-3 '>
          
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Website" startContent={<GlobeIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Instagram" startContent={<InstaIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Facebook" startContent={<FacebookIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Twitter" startContent={<TwitterIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Snapchat" startContent={<SnapchatIcon/>}  /> 
        <Input type="url" variant="underlined" classNames={{input : "text-xs"}} placeholder="Linkedin" startContent={<LinkedinIcon/>}  /> 
        </div>
        

        

        </form>
        



        

    </DefaultLayout>
  )
}

export default Profile