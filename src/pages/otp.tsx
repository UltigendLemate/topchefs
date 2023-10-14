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

import { GetServerSideProps } from 'next';
import { getSession, signIn, useSession } from "next-auth/react";

type OtpSession = {
  Details: string;
  Status: string;
}
const Otp = () => {
  const session  = useSession();
  // console.log(session);
  // useEffect(() => {
  //   if (session?.status == "unauthenticated" && typeof window !== 'undefined') {
  //     signIn('google');
  //   }
  // }, [session]);
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
    fetch(`https://2factor.in/API/V1/${env.SMS_OTP_KEY}/SMS/${phone}/AUTOGEN`, {
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
    fetch(`https://2factor.in/API/V1/${env.SMS_OTP_KEY}/SMS/VERIFY/${otpSession}/${otp}`, {
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
      const endTime = moment().add(2, "minutes");

      const interval = setInterval(() => {
        const timeDiff = moment.duration(endTime.diff(moment()));
        const minutes = timeDiff.minutes().toString();
        const seconds = timeDiff.seconds().toString();

        const timeRemainingString = `${minutes}:${seconds.padStart(2, "0")}`;
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
      <div className="grid h-full items-center ">
        {/* <button onClick={() => handleSubmit()}>Generate OTP</button> */}
        <form
          action=""
          className="-m-1  my-auto rounded-xl border border-gray-500 p-3 font-mont shadow-gray-600"
        >
          <h1 className={title({ size: "sm", color: "violet" })}>
            Lets Get to Know you!
          </h1>
          <Input type="text" variant="underlined" label="Full Name" />
          <Input
            type="email"
            variant="underlined"
            label="Email"
            description="This email will be shared in the magazines"
          />
          <div className="my-4  flex items-center gap-3 text-center">
            <Input
              type="text"
              variant="bordered"
              className=""
              value={phone || ""}
              onValueChange={(item: string) => setphone(item)}
              label="Phone Number"
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
                isDisabled={disabled}
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
              isDisabled={disabled}
              id="send-otp-button"
              className={otpsent ? "hidden" : "block"}
            >
              Send OTP
            </Button>
          )}
          {(isTimerRunning || otpsent) && (
            <p className="my-2 text-center text-sm">
              Not Recieved?{" "}
              <label
                htmlFor="send-otp-button"
                className={
                  isTimerRunning
                    ? "text-blue-100"
                    : "text-blue-500 hover:text-blue-500"
                }
              >
                Send again
              </label>{" "}
              in {timeRemaining}
            </p>
          )}
          {verified == "Success" && (
            <div className="grid">
              <Button
                color="success"
                variant="shadow"
                isDisabled={!verified}
                className="my-3"
              >
                Next
              </Button>
            </div>
          )}
        </form>
      </div>
    </DefaultLayout>
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
      role: user.role,
    },
  }
}


export default Otp;
