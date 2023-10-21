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
import React, { useCallback, useContext, useEffect , useState} from "react";
import { UserType } from "~/pages/profile";

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
    // const session = useSession().data;

	const { data: session, status } = useSession()

	const [userData, setuserData] = useState<UserType>({} as UserType);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuIcon = ()=>{
		if (!isMenuOpen){
			if (status == "authenticated"){
				return <Avatar src={session?.user?.image ?? '/default-image.jpg'}  size="sm" />;
			}
			else{
				return <div>menu</div>;
			}
		}
		else{
			return <div>cross</div>;
		}
	}

	const toggleMenu = () => {
	  setIsMenuOpen(!isMenuOpen);
	};


	
	const fetchProfileData = async () => {
		const res = await fetch('api/getUser',
		  {
			method: 'POST',

			body: JSON.stringify({ id: session?.user?.id }),
	   }
		)

		if (res.ok) {
			const data = await res.json() as UserType;
			setuserData(data);
        console.log(data);
		}
	}

	useEffect(() => {
		if (status === 'authenticated') {
		  void fetchProfileData();
		}
	  }, [session, status]);




	if (status === 'loading') {
		return <div>Loading...</div>
	  }


	
	  


    
	return (
		<NextUINavbar maxWidth="xl" position="sticky" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">TopChefs </p>
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
				
					{/* <Link isExternal href={siteConfig.links.whatsapp} aria-label="Whatsapp">
						<WhatsappIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.instagram} aria-label="Instagram">
						<InstaIcon className="text-default-500" />
					</Link> */}
					{status == "authenticated" && 
					<Button color="primary" variant="flat" as={Link} href="/pricing" className=" font-mont font-bold">{userData.role}</Button>}
					
					<ThemeSwitch />
				</NavbarItem>
				{/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
				<NavbarItem className="hidden md:flex">
					{!session ?
						(<Button

							className="text-sm font-normal text-default-900 bg-primary-100"

							onClick={() => {
                                void signIn('google', { callbackUrl: '/pricing' })
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
			

				{status == "authenticated" && 
					<Button color="primary" variant="flat" as={Link} href="/pricing" className=" font-mont font-bold">{userData.role}</Button>}
				</NavbarItem>
				<ThemeSwitch />
				
				 {status == "authenticated" ? <NavbarMenuToggle icon={<Avatar src={session?.user?.image ?? '/default-image.jpg'}  size="sm" />} /> : <NavbarMenuToggle /> }
					

			</NavbarContent>

			<NavbarMenu>
				{/* {searchInput} */}
				<NavbarMenuItem className="text-center">
				{/* {session &&
				<div className=" flex justify-center items-center gap-4">
				<Avatar src={session.user?.image ?? '/default-image.jpg'} as={Link} href="/profile" size="sm" />
				<Link
								color="foreground"
			
								href="/profile"
								size="lg"
								className="text-2xl"
							>
								Profile
							</Link>
						
				</div>
							
						}  */}
				</NavbarMenuItem>
				<div className="mx-4 mt-5 flex flex-col items-center gap-6  text-center  ">
					{siteConfig.phoneNavItems.map((item, index) => (
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
							
							onClick={() => void signIn("google",{ callbackUrl: '/pricing' })}
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