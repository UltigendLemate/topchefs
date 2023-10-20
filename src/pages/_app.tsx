import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import "~/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
      <NextUIProvider >
			<NextThemesProvider>
      <Component {...pageProps} />
      </NextThemesProvider>
		</NextUIProvider>
    </SessionProvider>
  );
};

export default MyApp;
