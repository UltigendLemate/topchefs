/*eslint-disable*/
import React from "react";
import DefaultLayout from "~/components/Layout/default";
import { useState, useEffect, ChangeEventHandler } from "react";
import CustomAccordion from "~/components/CustomAccordion";
import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
  Tooltip,
  Image,
  Button,
  Accordion,
  AccordionItem,
  Link
} from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import {
  UserSchema,
  currentDesignation,
  cities,
  educationOptions,
  CuisineSpecialization,
  SpecialTags,
} from "~/server/zobj";
import { z } from "zod";
import { env } from "~/env.mjs";

import { title, subtitle } from "~/components/primitives";
import {
  EditIcon,
  FacebookIcon,
  GlobeIcon,
  InstaIcon,
  LinkedinIcon,
  SnapchatIcon,
  TwitterIcon,
} from "~/components/icons";
import { prisma } from "~/server/client";

import { GetServerSideProps } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

cities.sort();

export type UserType = z.infer<typeof UserSchema>;

const Profile = (props: { user: any }) => {
  // console.log("session" , props.session)
  const session = useSession();
  // console.log(session);
  const success = (text: string) => {
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
  };

  const failure = (text: string) => {
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
  };

  const [eventImage, setEventImage] = useState<File | null>(null);
  const [data, setData] = useState<UserType>(props.user as UserType);

  const [loading, setloading] = useState(false);
  const [upImage, setUpImage] = useState<File | null>(null);


  const dndHandler = (img: FileList) => {
    const file = Array.from(img)[0];
    setEventImage(file!);
    console.log(img[0]);
    const image = img[0];
    setUpImage(image!);
  };

  const setUploadFiles = (files: FileList) => {
    dndHandler(files);
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setUploadFiles(e.target.files);
    }
  };

  // const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   const selectedFile = e.target.files && e.target.files[0];
  //   if (selectedFile) {
  //     setUpImage(selectedFile);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);


    try {

      // console.log("upimage : ",upImage)
      if (upImage) {
        // console.log("uploading image")

        const formData = new FormData();

        formData.append('file', upImage!);
        console.log(formData)

        const imguploading = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData
          ,
        });

        const imgJson = await imguploading.json();
        console.log(imgJson);
        setData({ ...data, ChefImage: imgJson.secure_url });
      }

      // const response = await fetch("/api/profile", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     ...data,
      //     City: data.City?.replace(/ /g, "_"),
      //     id: session?.data?.user.id,
      //   }),
      // });
      // // Handle the response
      // if (response.ok) {
      //   success("Your Details Have Been Updated!");
      //   console.log(response.json());
      // } else {
      //   failure("Something went wrong!");

      //   // Show an error message to the user
      //   console.log("error : ", response);
      // }
    } catch (err) {
      failure("Something went wrong!");

      console.log("error : ", err);

      // Show an error message to the user
    }

    setloading(false);
  };


  const accordionItems = [
    {
      heading: 'Enhance Your Profile',
      disable: props.user.plan == "Free",
      subHeading: "This section is only available to starter plan users!",
      content: (
        <div>

          <Input
            type="text"
            variant="underlined"
            label="Address"
            value={data.Address}
            onValueChange={(item: string) =>
              setData({ ...data, Address: item })
            }
          />

          <Input
            type="number"
            variant="underlined"
            value={data.Experience ? String(data.Experience) : undefined}
            onValueChange={(item: string) =>
              setData({ ...data, Experience: parseInt(item) })
            }
            description="How many years of culinary experience do you have?"
            label="Experience (Number of years)"
          />

          <Textarea
            minRows={1}
            label="Brief Introduction (max 50 words)"
            variant="underlined"
            className="mt-3"
            value={data.Intro}
            onValueChange={(item: string) =>
              setData({ ...data, Intro: item })
            }
          />

          <div className="mt-3 grid grid-cols-2 gap-x-3 ">
            <Input
              type="url"
              variant="underlined"
              value={data.website}
              onValueChange={(item: string) =>
                setData({ ...data, website: item })
              }
              classNames={{ input: "text-xs" }}
              placeholder="Website"
              startContent={<GlobeIcon />}
            />
            <Input
              type="url"
              variant="underlined"
              value={data.instagram}
              onValueChange={(item: string) =>
                setData({ ...data, instagram: item })
              }
              classNames={{ input: "text-xs" }}
              placeholder="Instagram"
              startContent={<InstaIcon />}
            />
            <Input
              type="url"
              variant="underlined"
              value={data.facebook}
              onValueChange={(item: string) =>
                setData({ ...data, facebook: item })
              }
              classNames={{ input: "text-xs" }}
              placeholder="Facebook"
              startContent={<FacebookIcon />}
            />
            <Input
              type="url"
              variant="underlined"
              value={data.twitter}
              onValueChange={(item: string) =>
                setData({ ...data, twitter: item })
              }
              classNames={{ input: "text-xs" }}
              placeholder="Twitter"
              startContent={<TwitterIcon />}
            />
            <Input
              type="url"
              variant="underlined"
              value={data.snapchat}
              onValueChange={(item: string) =>
                setData({ ...data, snapchat: item })
              }
              classNames={{ input: "text-xs" }}
              placeholder="Snapchat"
              startContent={<SnapchatIcon />}
            />
            <Input
              type="url"
              variant="underlined"
              value={data.linkedin}
              onValueChange={(item: string) =>
                setData({ ...data, linkedin: item })
              }
              classNames={{ input: "text-xs" }}
              placeholder="Linkedin"
              startContent={<LinkedinIcon />}
            />
          </div>
        </div>
      ),
    },
    {
      heading: 'Showcase Your Expertise!',
      subHeading: "This section is only available to premium plan users!",
      // disable : props.user.plan != "Premium",
      disable: false,

      content: (
        <div className="flex flex-col rounded-xl pb-3">
          <Input
            type="text"
            variant="underlined"
            value={data.Awards}
            onValueChange={(item: string) =>
              setData({ ...data, Awards: item })
            }
            label="Achievements/Awards (max 50 words)"
          />

          <Select
            variant="underlined"
            label="Cuisine Specialization"
            selectionMode="multiple"
            className="max-w-xs"
            description="Select all that apply"
            selectedKeys={
              data.CuisineSpecialization
                ? data.CuisineSpecialization
                : undefined
            }
            onSelectionChange={(e) => {
              const des = Array.from(e);
              setData({
                ...data,
                CuisineSpecialization: des.map((des) => String(des)),
              });
            }}
          >
            {CuisineSpecialization.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            minRows={1}
            label="Previous work place(s)"
            variant="underlined"
            className="mt-3"
            value={data.PrevWork}
            onValueChange={(item: string) =>
              setData({ ...data, PrevWork: item })
            }
          />

          <div>
            <h1>Image Input</h1>
            <input type="file" onChange={handleFileChange} />
            {/* leaving for chotani */}

            {upImage && (
              <Image
                src={URL.createObjectURL(upImage)}
                width={200}
                height={200}
                alt="Uploaded image"
              />
            )}
          </div>

          <Select
            variant="underlined"
            label="Speciality Tags"
            selectionMode="multiple"
            className="max-w-xs"
            description="Select all that apply"
            selectedKeys={data.Speciality ? data.Speciality : undefined}
            onSelectionChange={(e) => {
              const des = Array.from(e);
              setData({
                ...data,
                Speciality: des.map((des) => String(des)),
              });
            }}
          >
            {SpecialTags.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </Select>

          <Input
            type="text"
            variant="underlined"
            label="Which brand(s) do you endorse?"
          />

          <Textarea
            minRows={1}
            label="Have you made any media appearances?"
            variant="underlined"
            className="mt-3"
          />
          <Textarea
            minRows={1}
            label="Are you a member of any chef association?"
            variant="underlined"
            className="mt-3"
          />

          <Checkbox
            radius="full"
            classNames={{ label: "text-xs" }}
            isSelected={data.AvailableFor}
            onValueChange={(item) =>
              setData({ ...data, AvailableFor: item })
            }
            className="my-2"
          >
            I am available for Private Events/Brand endorsements.
          </Checkbox>
        </div>
      ),
    },
    // Add more sections with input components as content
  ];







  useEffect(() => {
    console.log("data", data);
    setData({ ...data, City: data.City?.replace(/_/g, " ") });
  }, []);


  return (
    <>
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
      {loading ? (
        <div>loading</div>
      ) : (

        <DefaultLayout>
          {/* basic details  */}
          <form onSubmit={handleSubmit}>
            <div className=" my-auto  mt-3 shadow-sm  rounded-lg shadow-gray-600 px-3 py-5 font-mont">
              <h1 className={title({ size: "sm", color: "violet" })}>
                Basic Details{" "}
                <Link href="/otp">
                  <EditIcon className="inline h-7 w-7 text-default-500" />
                </Link>
              </h1>

              <Input
                type="text"
                variant="underlined"
                label="Full Name"
                isDisabled
                value={data.name}
              />

              <Input
                type="email"
                variant="underlined"
                label="Email"
                isDisabled
                value={data.email}
                description="This email will be shared in the magazines"
              />

              <Input
                type="text"
                variant="underlined"
                isDisabled
                value={data.phone}
                label="Phone Number"
              />
            </div>

            {/* additional details  */}
            <div className=" my-auto   mt-7 shadow-sm rounded-lg shadow-gray-600 px-3 py-5 font-mont ">
              <h1 className={title({ size: "sm", color: "blue" })}>
                Tell us more!
              </h1>

              <Select
                variant="underlined"
                label="Select your current designation"
                className="max-w-xs"
                selectedKeys={data.currentDes ? [data.currentDes] : undefined}
                onSelectionChange={(e) => {
                  const des = Array.from(e)[0];
                  setData({ ...data, currentDes: String(des) });
                }}
              >
                {currentDesignation.map((designation) => (
                  <SelectItem key={designation} value={designation}>
                    {designation}
                  </SelectItem>
                ))}
              </Select>

              <Input
                type="text"
                variant="underlined"
                value={data.Establishment}
                onValueChange={(item: string) =>
                  setData({ ...data, Establishment: item })
                }
                description="Where are you working currently?"
                label="Name of your Current Establishment"
              />

              <Select
                variant="underlined"
                label="City"
                className="max-w-xs"
                selectedKeys={data.City ? [data.City] : undefined}
                onSelectionChange={(e) => {
                  const cit = Array.from(e)[0];
                  setData({ ...data, City: String(cit) });
                }}
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
                selectedKeys={data.Education ? [data.Education] : undefined}
                onSelectionChange={(e) => {
                  const edu = Array.from(e)[0];
                  setData({ ...data, Education: String(edu) });
                }}
              >
                {educationOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </Select>
            </div>


            <CustomAccordion items={accordionItems} />



            <Button className="mt-3" type="submit" color="success">
              Submit
            </Button>
          </form>
        </DefaultLayout>

      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  console.log("session: ", session);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  // check if user is an admin
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
    include: {
      Speciality: true,
      CuisineSpecialization: true,
    },
  });

  console.log(user);
  if (!user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const specialityArray = user?.Speciality?.map((tag) => tag.name);
  const cuisineSpecializationArray = user?.CuisineSpecialization?.map(
    (specialization) => specialization.name
  );



  const userCreatedAt = user.createdAt.toISOString();



  return {
    props: {
      user: {
        ...user,
        Speciality: specialityArray,
        CuisineSpecialization: cuisineSpecializationArray,
        createdAt: userCreatedAt,
      },
    },
  };
};

export default Profile;
