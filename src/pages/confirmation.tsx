
import React from 'react'
import DefaultLayout from '~/components/Layout/default'
import { Button, Image } from '@nextui-org/react'
import Link from 'next/link';
import { useRouter } from "next/router";
import { GetServerSideProps } from 'next';
import { env } from "~/env.mjs";
import { getSession, useSession } from 'next-auth/react';
import { UserType } from './profile';
import { title, subtitle } from '~/components/primitives';
import { FcRight } from 'react-icons/fc';
import { AiOutlineDoubleRight } from 'react-icons/ai';


type AccessToken = {
  access_token?: string,
  expires_in?: number,
  scope?: string,
  token_type?: string,
  error?: string,
}

type PaymentResponse = {
  id: string;
  user: string;
  phone: null | string;
  email: null | string;
  buyer_name: null | string;
  amount: string;
  purpose: string;
  status: string;
  payments: string[];
  send_sms: boolean;
  send_email: boolean;
  sms_status: null | string;
  email_status: null | string;
  shorturl: string;
  longurl: string;
  redirect_url: string;
  webhook: null | string;
  scheduled_at: null | string;
  expires_at: null | string;
  allow_repeated_payments: boolean;
  mark_fulfilled: boolean;
  created_at: string;
  modified_at: string;
  resource_uri: string;
}

const Confirmation = (props: { PaymentResponse: PaymentResponse, role: string }) => {
  // console.log(props)
  return (
    <div className='flex flex-col md:flex-row items-center '>
      <div className='md:w-1/2'>
      <Image
        src={"/images/cook.png"}
        width={1000}
        height={1000}

        classNames={{
          img: " w-full ",
          wrapper: " w-full",
          // zoomedWrapper: "h-full",
        }}
        className="px-5 py-3 md:p-10" alt='confirmation of plan' />
        </div>

        <div>
      <h1 className={title({ size: "sm" })}>Congratulations! <br className='hidden md:block'/> You have chosen our <span className={title({ color: "yellow", fontWt: "bold", size: "md" })}>{props.role}</span> Plan </h1>

      <div className='text-xl lg:text-2xl'>
        <h4 className="text-default-600 my-4 ">Please proceed as follows :</h4>
        <Button variant='solid' as={Link} href='/otp' color="secondary" className='my-2.5 flex items-center justify-center w-max text-lg'>Verify Phone Number</Button>
        <Button variant='solid' as={Link} href='/profile' color="default" className='my-2.5 flex items-center justify-center w-max text-lg' endContent={<AiOutlineDoubleRight className='inline  text-xl  my-2 self-center content-center ml-1 ' />}>Go to Dashboard</Button>

      </div>
      </div>
    </div>
  )
}




export const getServerSideProps: GetServerSideProps = async (context) => {

  const session = await getSession(context)
  console.log("session: ", session)
  if (!session?.user) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }


  // Get the parameters from the URL
  const { payment_id, payment_status, payment_request_id } = context.query;
  if (!payment_id || !payment_status || !payment_request_id) {
    return {
      redirect: {
        destination: '/pricing',
        permanent: false,
      },
    }
  }




  // generating access tokens
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: env.INSTAMOJO_CLIENT_ID,
      client_secret: env.INSTAMOJO_CLIENT_SECRET
    })
  };

  const response = await fetch('https://api.instamojo.com/oauth2/token/', options);
  const responseJson = await response.json() as AccessToken;
  console.log(responseJson)





  //   Make the API calls using the parameters from the URL to get the details of the payment request
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const getPaymentResponse = await fetch(`https://api.instamojo.com/v2/payment_requests/${payment_request_id}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${responseJson.access_token}`
      }
    });
  const PaymentResponse = await getPaymentResponse.json() as PaymentResponse;
  console.log(PaymentResponse);
  let role = "Free";

  if (PaymentResponse.status == "Completed") {
    console.log("payment successfull");
    if (PaymentResponse.amount == "10.00" && PaymentResponse.purpose == "Starter") {
      console.log("start krdia")
      role = "Starter";
    }
    else if (PaymentResponse.amount == "10.00" && PaymentResponse.purpose == "Premium") {
      console.log("premium krdia")

      role = "Premium";
    }
  }


  console.log("role is : \n", role);

  //updating payment_request_id in the user table
  const profileUpdate = await fetch("http://localhost:3000/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payment_request_id,
      role: role,
      id: session?.user.id
    }),
  });


  const profilejson = await profileUpdate.json() as UserType;
  console.log("\n\nconfirmatoin json: ", profilejson);



  // Return the JSON as propss
  return {
    props: {
      PaymentResponse,
      role

    },
  };
}



export default Confirmation