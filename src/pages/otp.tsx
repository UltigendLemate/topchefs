/*eslint-disable*/
import React from "react";
import { useState, useEffect } from "react";
import DefaultLayout from "~/components/Layout/default";
import { Input, Button } from "@nextui-org/react";
import moment from "moment";
import { title, subtitle } from "~/components/primitives";
import { set } from 'zod';
import { env } from "~/env.mjs";
const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from "next-auth/react";

import { useRouter } from "next/router";

type OtpSession = {
  Details: string;
  Status: string;
}
type subsetUser = {
  phone : string;
  name : string;
  email : string;
  role : string;
}
const Otp = (props : subsetUser) => {
  const router = useRouter();
  const session  = useSession();
  const [otpSession, setotpSession] = useState('');
  const [OTP, setOTP] = useState('');
  const [loading, setloading] = useState(false);
  const [phone, setphone] = useState(props.phone);
  const [name, setname] = useState(props.name);
  const [email , setemail] = useState(props.email);
  // const [disabled, setDisabled] = useState(false); //send otp button disabled
  const [otpsent, setOtpsent] = useState(false); //initially false, when send otp is pressed, 
  //then it is true, when otp is verified, then it is false again
  const [verified, setverified] = useState('');
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('1:59');


  const handleSubmit = (phone : string) => {
    if (phone.length != 10) {
      failure("Please enter a valid phone number");
      // clearInterval(interval);
      setOtpsent(false);
      setIsTimerRunning(false); // Timer finished
      // setDisabled(false);
      return;
    }
    fetch(`/api/sendOTP`, {
      method: 'POST',
      body : JSON.stringify({phone : phone}),
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
        if (jsonResult.Status == "Success"){
          success("OTP Sent Successfully");
        }
        else{
          failure("Failed to send OTP");
        }
  
        setotpSession(jsonResult.Details);
        // Console log the JSON object
        console.log(jsonResult);
      })
      .catch(error => {
        failure("Failed to send OTP");
        console.error('Error:', error);
      });
  };

  // const handleSubmit = (phone : string) => {
  //   success("yes")}

  const success = (text : string ) =>{
    toast.success(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const failure = (text : string) =>{
    toast.error(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }

  const verifyOtp = (otp : string) => {
    fetch('/api/verifyOTP', {
      method: 'POST',
      body : JSON.stringify({otp : otp, otpSession : otpSession}),
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
        if (jsonResult.Status == "Success") {
          success("OTP Verified Successfully");
        }
        else{
          failure("Failed to verify OTP");
        }

        // Console log the JSON object
        console.log(jsonResult);
      })
      .catch(error => {
        failure("Failed to verify OTP");
        console.error('Error:', error);
      });

  }

  // const verifyOtp = (otp : string) => {
  //   setverified("Success");
  //   success("yes")
  // }
  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //prevent default
    // const form = e.currentTarget;
    e.preventDefault();
    setloading(true);
    if (!verified){
      setphone('');
      setOtpsent(false);
      setemail('');
      setname('');
    failure("Please verify OTP first!");
    return;
    }

    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
        id : session?.data?.user.id,
        phone : phone,
        name : name,
        email : email,
      }),
    });
    if (!response.ok) {
      setloading(false);
      failure("some error occured");
      return;
    }

    const responseJson = await response.json();
    console.log(responseJson);
    
    router.push("/profile");
    // setloading(false);
     

    // else {
    //   failure("Failed to update profile");
    //   // throw new Error('Failed to update profile');
    // }



  }

  const handleClick = () => {
    setIsTimerRunning(true);
    setOtpsent(true);
    handleSubmit(phone);
  };

  // Manually decrement the initial seconds by 1
  // setTimeLeft({ minutes: timeLeft.minutes, seconds: timeLeft.seconds - 1 });

  useEffect(() => {
    if (isTimerRunning) {
      const endTime = moment().add(1, "minutes");

      const interval = setInterval(() => {
        const timeDiff = moment.duration(endTime.diff(moment()));
        const minutes = timeDiff.minutes().toString();
        const seconds = timeDiff.seconds().toString();

        const timeRemainingString = `${minutes}:${seconds.padStart(2, "0")}`;
        setTimeRemaining(timeRemainingString);

        if (moment() > endTime) {
          clearInterval(interval);
          setOtpsent(false);
          setIsTimerRunning(false); // Timer finished
          // setDisabled(false); // Enable the button
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isTimerRunning]);

  return (
    <>
    {loading ? (
      <div>loading</div>
    ) : 
  (    <>
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    
    <div className="grid h-full items-center ">
      {/* <button onClick={() => handleSubmit()}>Generate OTP</button> */}
      <form
        onSubmit={formSubmit}
        className="-m-1  my-auto rounded-xl border border-gray-500 p-3 font-mont shadow-gray-600"
      >
        <h1 className={title({ size: "sm", color: "violet" })}>
          Lets Get to Know you!
        </h1>
        <Input type="text" variant="underlined" value={name} onValueChange={setname} label="Full Name" />
        <Input
          type="email"
          variant="underlined"
          label="Email"
          value = {email}
          onValueChange = {setemail}
          description="This email will be shared in the magazines"
        />
        <div className="my-4  flex items-center gap-3 text-center">
          <Input
            type="text"
            variant="bordered"

            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 ">+91</span>
              </div>
            }
            value={phone || ""}
            onValueChange={(item: string) => setphone(item)}
            label="Phone Number"
            isDisabled = {otpsent}
          />
        </div>
        {/* timer running starts */}
        {/* timer running ends */}
        {otpsent && (
          <div className="my-4 flex items-center gap-3 text-center ">
            <Input type="text" value={OTP} onValueChange={(item: string) => setOTP(item)} variant="bordered" label="Enter OTP" />
          </div>
        )}
        <div className={`grid grid-cols-1 gap-3`}>

          {otpsent ? (
            <Button color="success" variant="flat" onClick={()=>verifyOtp(OTP)} className="">
              Verify OTP
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={handleClick}
              id="send-otp-button"
              className={otpsent ? "hidden" : "block"}
            >
              Send OTP
            </Button>
          )}

        </div>
        {otpsent && (
          <Button
            color="primary"
            onClick={handleClick}
            isDisabled={otpsent}
            id="send-otp-button"
            className={otpsent ? "hidden" : "block"}
          >
            Send OTP
          </Button>
        )}
        {(isTimerRunning || otpsent) && (
          <p className="my-2 text-center text-sm">
            Not Recieved?{" "}
            
              Send again
            
            in {timeRemaining}
          </p>
        )}
        {verified == "Success" && (
          <div className="grid">
            <Button
              color="success"
              variant="shadow"
              // isDisabled={!verified}
              type="submit"
              className="my-3"
            >
              Next
            </Button>
          </div>
        )}
      </form>
    </div>
  </>)}
  </>

  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const session = await getSession({ req })

  if (!session?.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  // if (user.role !== Role.SuperAdmin) {
  //   return {
  //     redirect: {
  //       destination: '/dashboard',
  //       permanent: false,
  //     },
  //   }
  // }



  return {
    props: {
      phone : user.phone,
      name : user.name,
      email : user.email,
      role: user.role,
    },
  }
}


export default Otp;
