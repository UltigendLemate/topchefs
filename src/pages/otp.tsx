import React from 'react';
import { useState, useEffect } from 'react';
import DefaultLayout from "~/components/Layout/default";
import {Input, Button} from "@nextui-org/react";
import moment from 'moment';
import { title, subtitle } from "~/components/primitives";
import { set } from 'zod';


type OtpSession = {
  Details: string;
  Status: string;
}
const Otp = () => {
  const [otpSession, setotpSession] = useState('');
  const [OTP, setOTP] = useState('');
  const [phone, setphone] = useState('');
  const [disabled, setDisabled] = useState(false); //send otp button disabled
  const [otpsent, setOtpsent] = useState(false); //initially false, when send otp is pressed, 
  //then it is true, when otp is verified, then it is false again
  const [verified, setverified] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('1:59');

  const handleSubmit = (phone : string) => {
    fetch(`https://2factor.in/API/V1/780d11be-63c1-11ee-addf-0200cd936042/SMS/${phone}/AUTOGEN`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to fetch OTP');
        }
      })
      .then(result => {
        // Parse the JSON result into a JavaScript object
        const jsonResult = JSON.parse(result) as OtpSession;
  
        setotpSession(jsonResult.Details);
        // Console log the JSON object
        console.log(jsonResult);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const verifyOtp = (otp : string) => {
    fetch(`https://2factor.in/API/V1/780d11be-63c1-11ee-addf-0200cd936042/SMS/VERIFY/${otpSession}/${otp}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to verify OTP');
        }
      })
      .then(result => {
        // Parse the JSON result into a JavaScript object
        const jsonResult = JSON.parse(result) as OtpSession;
        setverified(jsonResult.Status);

        // Console log the JSON object
        console.log(jsonResult);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }

  const handleClick = () => {
    setOtpsent(true);

    setIsTimerRunning(true);
    setDisabled(true);
    handleSubmit(phone);
  };


  
    // Manually decrement the initial seconds by 1
    // setTimeLeft({ minutes: timeLeft.minutes, seconds: timeLeft.seconds - 1 });

  

    useEffect(() => {
      if (isTimerRunning) {
        const endTime = moment().add(2, 'minutes');
  
        const interval = setInterval(() => {
          const timeDiff = moment.duration(endTime.diff(moment()));
          const minutes = timeDiff.minutes().toString();
          const seconds = timeDiff.seconds().toString();
  
          const timeRemainingString = `${minutes}:${seconds.padStart(2, '0')}`;
          setTimeRemaining(timeRemainingString);
  
          if (moment() > endTime) {
            clearInterval(interval);
            setIsTimerRunning(false); // Timer finished
            setDisabled(false); // Enable the button
          }
        }, 1000);
  
        return () => {
          clearInterval(interval);
        };
      }
    }, [isTimerRunning]);
  
  return (
    <DefaultLayout>
      <div className='grid items-center h-full '>
        {/* <button onClick={() => handleSubmit()}>Generate OTP</button> */}
        <form action="" className='font-mont  p-3 rounded-xl border border-gray-500 shadow-gray-600 -m-1 my-auto'>
          <h1 className={title({ size: "sm", color: "violet" })}>Lets Get to Know you!</h1>
        <Input type="text" variant="underlined" label="Full Name" />
        <Input type="email" variant="underlined" label="Email" description="This email will be shared in the magazines" />
        <div className='flex  items-center text-center my-4 gap-3'>
        <Input type="text" variant="bordered" className='w-2/3' value={phone || ""}
                onValueChange={(item: string) => setphone(item)} label="Phone Number"  />   
        <div>
        <Button  color='primary' onClick={handleClick} isDisabled={disabled} >Send OTP</Button>
        </div>
        </div>
        {isTimerRunning && <p className='-mt-4 mb-3 text-sm text-right'>Send again in {timeRemaining}</p>}

        {otpsent && <div className='flex items-center text-center my-4 gap-3 '>
        <Input type="text" variant="bordered" value={OTP || ""}
                onValueChange={(item: string) => setOTP(item)} label="Enter OTP"  />   
        <Button color='success' variant='flat' onClick={()=> verifyOtp(OTP) }  className='' >Verify OTP</Button>
        </div>}
        <Button color='success' variant='shadow' isDisabled={!verified}>Next</Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Otp;
