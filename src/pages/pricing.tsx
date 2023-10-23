import React, { useState } from 'react'
import DefaultLayout from '~/components/Layout/default'
import { Button } from '@nextui-org/react'
import { useRouter } from "next/router";
import { SwiperComponent } from '~/components/SwiperComponent';
import { getSession, useSession } from 'next-auth/react';
import { prisma } from "~/server/client";
import { GetServerSideProps } from "next";
import { UserType } from './profile';





type AccessToken = {
  access_token?: string,
  expires_in?: number,
  scope?: string,
  token_type?: string,
  error?: string,
}

interface InstamojoPaymentRequest {
  allow_repeated_payments: boolean;
  amount: string;
  buyer_name: null | string;
  created_at: string;
  email: null | string;
  email_status: null | string;
  expires_at: null | string;
  id: string;
  longurl: string;
  mark_fulfilled: boolean;
  modified_at: string;
  payments: [];
  phone: null | string;
  purpose: string;
  redirect_url: string;
  resource_uri: string;
  scheduled_at: null | string;
  send_email: boolean;
  send_sms: boolean;
  shorturl: null | string;
  sms_status: null | string;
  status: string;
  user: string;
  webhook: null | string;
  error?: string,
}



const Pricing = (user : UserType) => {

  const router = useRouter();
  const {data} = useSession();
  const [paymentRequest, setpaymentRequest] = useState<InstamojoPaymentRequest>({} as InstamojoPaymentRequest)
  const generateAccessToken = async () => {
    console.log("generateAccessToken");
    const response = await fetch('/api/generateAccessToken', {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch. Some error occured');
    }
    const jsonResult = await response.json() as AccessToken;
    if (jsonResult.error) {
      throw new Error(jsonResult.error);
      return;
    }
    // setAccess_token(jsonResult.access_token ?? "");
    console.log(jsonResult);
    return jsonResult;
  }

  const generatePayment = async (amount: number, purpose: string) => {
    if (!data?.user?.id){
      void router.push("/auth");
      return;
    }
    const token = await generateAccessToken();
    console.log("payment initiated", token);
    const response = await fetch('/api/generatePaymentRequest', {
      method: 'POST',
      body: JSON.stringify({
        access_token: token?.access_token,
        amount: amount,
        purpose: purpose
      })
    });
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const jsonResult = await response.json() as InstamojoPaymentRequest;
    if (jsonResult.error) {
      throw new Error(jsonResult.error);
      return;
    }

    setpaymentRequest(jsonResult);
    console.log(jsonResult);
    void router.push(jsonResult.longurl);
    return;
  }



  return (
    <>


      <SwiperComponent genPay={generatePayment} role={user.role} />
    </>
  )
}

export default Pricing

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
 
  const session = await getSession({ req });
  console.log("session: ", session);

  // check if user is an admin
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });

 

 



  const userCreatedAt = user?.createdAt.toISOString();



  return {
    props: {
      ...user,
      createdAt: userCreatedAt,

    },
  };
};
