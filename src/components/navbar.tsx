import {
	Button,
	Kbd,
	Link,
	Input,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
    Avatar
} from "@nextui-org/react";
import React, { useCallback } from "react";

import { signIn, signOut } from "next-auth/react";

import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "~/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "~/components/theme-switch";
import {
	WhatsappIcon,
	InstaIcon
} from "~/components/icons";

import { Logo } from "~/components/icons";

import { useSession } from "next-auth/react";



export const Navbar = () => {
    const session = useSession().data;

    
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">TopChefs</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2">
					{/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
						<TwitterIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label="Discord">
						<DiscordIcon className="text-default-500" />
					</Link> */}
					{/* <Link isExternal href={siteConfig.links.github} aria-label="Github">
						<GithubIcon className="text-default-500" />
					</Link> */}
					<Link isExternal href={siteConfig.links.whatsapp} aria-label="Whatsapp">
						<WhatsappIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.instagram} aria-label="Instagram">
						<InstaIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
				</NavbarItem>
				{/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
				<NavbarItem className="hidden md:flex">
					{!session ?
						(<Button

							className="text-sm font-normal text-default-900 bg-primary-100"

							onClick={() => {
                                void signIn('google')
                            }}

							variant="flat"
						>
							Register
						</Button>) :
						(
                            <Avatar src={session.user?.image ?? '/default-image.jpg'} as={Link} href="/profile" size="sm" />

				
						)}

				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
				<NavbarItem className="sm:hidden ">
					{session &&
				<Avatar src={session.user?.image ?? '/default-image.jpg'} as={Link} href="/profile" size="sm" />
						
						
							
						}
				</NavbarItem>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{/* {searchInput} */}
				<div className="mx-4 mt-5 flex flex-col items-center gap-6  text-center  ">
					{siteConfig.navItems.map((item, index) => (
						<NavbarMenuItem key={`${index}`}>
							<Link
								color="foreground"
			
								href={item.href}
								size="lg"
								className="text-2xl"
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}

	

					<NavbarMenuItem >
						{!session?
						(<Button
						
							color="primary"
							variant="flat"
							
							onClick={() => void signIn("google")}
							size="lg"
							className="text-2xl"
						>
							Sign In
						</Button>)
						:(
							<Button
						
							color="danger"
							variant="flat"
							
							onClick={() => void signOut()}
							size="lg"
							className="text-xl"
						>
							Logout
						</Button>
						)}
					</NavbarMenuItem>
				</div>
				<NavbarItem className="flex sm:hidden mx-auto mt-7 gap-2">

					<Link isExternal href={siteConfig.links.whatsapp} aria-label="Whatsapp">
						<WhatsappIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.instagram} aria-label="Instagram">
						<InstaIcon className="text-default-500" />
					</Link>
					{/* <ThemeSwitch /> */}
				</NavbarItem>
			</NavbarMenu>
		</NextUINavbar>
	);
};