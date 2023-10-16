/*eslint-disable*/
import React from "react";
import DefaultLayout from "~/components/Layout/default";
import { useState, useEffect, ChangeEventHandler } from "react";
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
  Link,
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
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
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

  const input_ref = useRef(null)

  // for (const key in props.user) {
  //   setData({ ...data, [key]: props.user[key] });
  //   // data[key as keyof UserType] = props.user[key] as never;
  // }

  // console.log(data,"\n\n\n\n\n\n",props.user)

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

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setUploadFiles(e.target.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);

    // setData({
    //   ...data,
    //   City : data.City?.replace(/ /g, '_'),
    //     })
    try {
      // console.log("trying")

      // const formData = new FormData();
      // // Append the image to form data
      // formData.append('file', upImage!);
      // // Bind the upload preset to the form data
      // formData.append("upload_preset", env.CLOUDINARY_PRESET)
      // const url = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_KEY}/image/upload`
      // console.log(formData);
      // const uploadResponse = await fetch(url, { method: "POST", body: formData });
      // const uploadedImageData = await uploadResponse.json();
      // console.log(uploadedImageData);
      // const imageUrl = uploadedImageData.secure_url;
      // console.log(imageUrl);
      // data.ChefImage = imageUrl;

      if (upImage) {
        const imguploading = await fetch("/api/uploadImage", {
          method: "POST",
          body: JSON.stringify({
            upImage: upImage,
          }),
        });

        const imgJson = await imguploading.json();
        console.log(imgJson);
        setData({ ...data, ChefImage: imgJson.secure_url });
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          City: data.City?.replace(/ /g, "_"),
          id: session?.data?.user.id,
        }),
      });
      // Handle the response
      if (response.ok) {
        success("Your Details Have Been Updated!");
        console.log(response.json());
      } else {
        failure("Something went wrong!");

        // Show an error message to the user
        console.log("error : ", response);
      }
    } catch (err) {
      failure("Something went wrong!");

      console.log("error : ", err);

      // Show an error message to the user
    }

    setloading(false);
  };

  var disabledPlans: Iterable<React.Key> | undefined = [];

  if (data && data.role) {
    if (data.role == "Free") {
      disabledPlans = ["1", "2"];
    } else if (data.role == "Starter") {
      disabledPlans = ["2"];
    } else {
      disabledPlans = [];
    }
  }

  useEffect(() => {
    console.log("data", data);
    setData({ ...data, City: data.City?.replace(/_/g, " ") });
  }, []);

  function replaceSpUn(inputString: string) {
    return inputString.replace(/ /g, "_");
  }

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
            <div className="-m-1 my-auto  mt-3 rounded-xl border border-gray-500 px-3 py-5 font-mont shadow-gray-600">
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
            <div className="-m-1 my-auto   mt-10 rounded-xl border border-gray-500 px-3 py-5 font-mont shadow-gray-600">
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

            <Accordion
              variant="splitted"
              className="mx-0 my-5 w-full px-0"
              itemClasses={{
                base: "w-full bg-yellow-600",
                content: "w-full  pt-0  -mt-3",
                title:
                  "tracking-tight inline font-semibold text-3xl lg:text-4xl font-mont",
                subtitle:
                  "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full !w-full",
              }}
            >
              <AccordionItem
                key="1"
                aria-label="Accordion 1"
                classNames={{
                  title:
                    "bg-clip-text text-transparent bg-gradient-to-b from-[#00b7fa] to-[#01cfea] tracking-tight inline font-semibold text-3xl lg:text-4xl font-mont",
                }}
                subtitle="This section is only avaiable to starter plan users!"
                title="Enhance Your Profile"
              >
                <Input
                  type="text"
                  variant="underlined"
                  value={data.Establishment}
                  onValueChange={(item: string) => {
                    console.log(item);

                    setData({ ...data, Establishment: item });
                  }}
                  description="Where are you working currently?"
                  label="Name of your Current Establishment"
                />

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
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Accordion 1"
                classNames={{
                  title:
                    "bg-clip-text text-transparent bg-gradient-to-b from-[#FF705B] to-[#FFB457] tracking-tight inline font-semibold text-3xl lg:text-4xl font-mont",
                }}
                subtitle="This section is only avaiable to premium plan users!"
                title="Showcase Your Expertise!"
              >
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
                    <input type="file" onChange={handleChange} />
                    {/* leaving for chotani */}

                    {eventImage && (
                      <Image
                        src={URL.createObjectURL(eventImage)}
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
              </AccordionItem>
            </Accordion>

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
  });
  if (!user) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const userCreatedAt = user.createdAt.toISOString();

  // if (user){
  // user.createdAt = user?.createdAt.toISOString()
  // }
  // if (!(user?.role === Role.Admin || user?.role === Role.SuperAdmin)) {
  //   return {
  //     redirect: {
  //       destination: '/dashboard',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
      user: {
        ...user,
        createdAt: userCreatedAt,
      },
    },
  };
};

export default Profile;
