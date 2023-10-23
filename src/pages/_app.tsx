import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import DefaultLayout from "~/components/Layout/default";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "~/components/Loading";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
  
	useEffect(() => {
	  router.events.on("routeChangeStart", () => {
		setIsLoading(true);
	  });
  
	  router.events.on("routeChangeComplete", () => {
		setIsLoading(false);
	  });
  
	  
	}, [router]);

  return (
    <SessionProvider session={session}>
      <NextUIProvider >
			<NextThemesProvider>
      {isLoading ? <Loading/> :
      <DefaultLayout>
          
      <Component {...pageProps} />
      </DefaultLayout>
       }
        
      </NextThemesProvider>
		</NextUIProvider>
    </SessionProvider>
  );
};

export default MyApp;
