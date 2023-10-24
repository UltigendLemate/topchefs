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
 
} from "@nextui-org/react";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import {
  UserSchema,
  currentDesignation,
  cities,
  educationOptions,
  CuisineSpecialization,
  SpecialTags,
  validationSchema
} from "~/server/zobj";
import { z } from "zod";
import { env } from "~/env.mjs";
import Dragdropfile from "~/components/Dragdropfile";
import Dragdropfiles from "~/components/Dragdropfiles";
import { title, subtitle } from "~/components/primitives";
import {
  CrossIcon,
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
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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

  const [data, setData] = useState<UserType>(props.user as UserType); // for storing form data
  const [deleteImages, setDeleteImages] = useState<String[]>([]); // for deleting crossed signature dishes
  const [loading, setloading] = useState(false);
  const [upImage, setUpImage] = useState<File | null>(null); // for profile image
  const [upImages, setUpImages] = useState<File[]>([]); // for signature dishes



  const dndHandler = (img: FileList) => {
    const image = img[0];
    setUpImage(image!);
  };

  const multipleDndHandler = (imgs: FileList) => {
    const newFiles: File[] = Array.from(imgs);
    setUpImages([...upImages, ...newFiles]);
    console.log("upimages", upImages)
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...upImages];
    updatedImages.splice(index, 1);
    setUpImages(updatedImages);
  };


  const handleDataDeleteImage = (deleteImage: string) => {
    const filteredItems = data.SignatureDish?.filter((item) => item != deleteImage);
    setData({ ...data, SignatureDish: filteredItems });
    setDeleteImages([...deleteImages, deleteImage]);
  };



  const handleSubmit = async () => {
    // e.preventDefault();
    setloading(true);
    let newSignatureDish = Array.from(data.SignatureDish ?? []);

    if (!data.phone || data.phone.length < 10){
      setloading(false);
      failure("Please verify your phone number first!");
      return;
    }


    if (upImages.length + newSignatureDish.length > 6) {
      failure("Maximum 6 images allowed!");
      setloading(false);
      return;
    }

    if (upImages.length > 0) {
      for (let index = 0; index < upImages.length; index++) {
        const element = upImages[index];
        if (!element || element.size > 2 * 1024 * 1024) {
          failure("Your signature dish image should not exceed 2MB!");
          setloading(false);
          return;
        }
      }
    }

    if (upImage && upImage.size > 2 * 1024 * 1024) {
      failure("Your profile pic should not exceed 2MB!");
      setloading(false);
      return;
    }



    try {
      //image handling
      let imgLink = data.ChefImage;
      if (upImage) {
        if (data.ChefImage) {
          const imguploading = await fetch("/api/deleteImage", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              url: data.ChefImage,
            }),
          });
          const imgJson = await imguploading.json();
          console.log(imgJson);
          // console.log(imgJson);
        }
        // console.log("uploading image")

        const formData = new FormData();
        formData.append('file', upImage!);


        const imguploading = await fetch("/api/uploadImage", {
          method: "POST",
          body: formData
        });
        const imgJson = await imguploading.json();
        console.log(imgJson);
        imgLink = imgJson.secure_url;
        // setData({ ...data, ChefImage: imgJson.secure_url });
      }



      if (deleteImages.length > 0) {
        const imguploading = await fetch("/api/deleteImages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicIds: deleteImages
          }),
        });
        const imgJson = await imguploading.json();
        console.log(imgJson);

      }

      if (upImages.length > 0) {

        const formData = new FormData();
        console.log("thisis it", upImages)
        for (let index = 0; index < upImages.length; index++) {
          formData.append('image', upImages[index]!);
        }
        console.log("formdata:\n\n", formData);
        // let imguploading;


        const imguploading = await fetch("/api/uploadSignatureDishes", {
          method: "POST",
          body: formData
        });

        const imgJson = await imguploading.json();
        console.log("this is output", imgJson);
        // imgLink = imgJson.secure_url;

        for (let index = 0; index < imgJson.length; index++) {
          const element = imgJson[index];
          newSignatureDish.push(element.secure_url);
        }
        setData({ ...data, SignatureDish: newSignatureDish });

      }







      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          SignatureDish: newSignatureDish,
          ChefImage: imgLink,
          City: data.City?.replace(/ /g, "_"),
          id: session?.data?.user.id,
        }),
      });
      // Handle the response
      if (response.ok) {
        success("Your Details Have Been Updated!");
        const updatedData = await response.json();
        // console.log("updated Data\n\n\n:", updatedData);
        setData({ ...data, ChefImage: updatedData.ChefImage, SignatureDish: updatedData.SignatureDish });
      }
      else {
        failure("Something went wrong!");

        // Show an error message to the user
        console.log("error : ", response);
      }

    }
    catch (err) {
      failure("Something went wrong!");

      console.log("error : ", err);

      // Show an error message to the user
    }

    setUpImages([]);
    setUpImage(null);
    console.log(upImage)
    setloading(false);
  };


  const accordionItems = [
    {
      heading: 'Enhance Your Profile',
      disable: props.user.plan == "Free",
      // disable: true,
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


          <Field
            name="Intro"
            type="text"
            as={Textarea}
            value={data.Intro}
            onValueChange={(item: string) =>
              setData({ ...data, Intro: item })
            }
            minRows={1}
            label="Brief Introduction (max 50 words)"
            variant="underlined"
            className="mt-3"
          />

          <ErrorMessage name="Intro" component="div" className="error" />

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

          <Field
            name="Awards"
            type="text"
            as={Input}
            variant="underlined"
            value={data.Awards}
            onValueChange={(item: string) =>
              setData({ ...data, Awards: item })
            }
            label="Achievements/Awards (max 50 words)"
            className="mt-3"
          />

          <ErrorMessage name="Awards" component="div" className="error" />

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

          <div className="flex flex-col items-center">
            <h3 className={subtitle()}>Profile picture, preferably in Chef Jacket <br /> Max Size : 2MB</h3>
            <Dragdropfile
              setUploadFiles={(file) => {
                dndHandler(file)
              }}
              multiple={false}
            />



            {(upImage || data.ChefImage) && (
              <Image
                src={upImage ? URL.createObjectURL(upImage) : data.ChefImage}
                width={200}
                height={200}
                className="mx-auto"
                alt="Uploaded image"
              />
            )}
          </div>


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



          <Select
            variant="underlined"
            label="Speciality Tags (Max 2)"
            selectionMode="multiple"
            // maxSelectedOptions={2}
            className="max-w-xs"
            description="Select all that apply"
            selectedKeys={data.Speciality ? data.Speciality : undefined}
            onSelectionChange={(e) => {
              const des = Array.from(e);
              if (des.length > 2) {
                failure("Maximum 2 tags allowed!");
                return;
              }
              // console.log(des);
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
            value={data.BrandEndorsed}
            onValueChange={(item: string) =>
              setData({ ...data, BrandEndorsed: item })
            }
          />

          <div className="flex flex-col items-center">
            <h3 className={subtitle()}>Your signature dishes/recipes <br /> Maximum 6 Images</h3>



            <div className="grid grid-cols-3 md:grid-cols-7 gap-3 h-auto">

              {
                data.SignatureDish && (
                  data.SignatureDish.map((image, index) => (
                    <div key={index} className="flex  relative items-center  justify-center w-full h-auto  ">
                      <CrossIcon className="absolute z-[20] top-1 right-0 bg-blue-500" size={25}
                        onClick={() => handleDataDeleteImage(image)} />
                      <Image
                        src={image}
                        width={500}
                        height={500}
                        radius="sm"

                        // className="w-full rounded-none h-full"
                        alt="Uploaded image"
                        classNames={{
                          img: "object-cover w-full h-full bg",
                          wrapper: " h-full",
                          zoomedWrapper: "h-full",
                        }}
                        isZoomed={true}
                      />
                    </div>
                  ))
                )
              }


              {upImages && (

                upImages?.map((image, index) => (
                  <div key={index} className="flex  relative items-center  justify-center w-full h-auto  ">
                    <CrossIcon className="absolute z-[20] top-1 right-0" size={25} onClick={() => handleDeleteImage(index)} />


                    <Image
                      src={URL.createObjectURL(image)}
                      width={500}
                      height={500}
                      radius="sm"

                      // className="w-full rounded-none h-full"
                      alt="Uploaded image"
                      classNames={{
                        img: "object-cover w-full h-full bg",
                        wrapper: " h-full",
                        zoomedWrapper: "h-full",
                      }}
                      isZoomed={true}
                    />
                  </div>
                ))

              )}

              <Dragdropfiles
                setUploadFiles={(file) => {
                  multipleDndHandler(file)
                }}
                multiple={true}
              />
            </div>


          </div>


       

          <Field
            name="MediaAppearance"
            type="text"
            as={Input}
            label="Have you made any media appearances?"
            variant="underlined"
            className="mt-3"
            value={data.MediaAppearance}
            onValueChange={(item: string) =>
              setData({ ...data, MediaAppearance: item })
            }
          />

          <ErrorMessage name="MediaAppearance" component="div" className="error" />


          <Field
            name="MemberForChef"
            type="text"
            as={Input}
            label="Are you a part of any chef association? Mention names."
            variant="underlined"
            className="mt-3"
            value={data.MemberForChef}
            onValueChange={(item: string) =>
              setData({ ...data, MemberForChef: item })
            }
          />

          <ErrorMessage name="MemberForChef" component="div" className="error" />
          {/* <Input
            // minRows={1}
            label="Are you a member of any chef association?"
            variant="underlined"
            className="mt-3"
            value={data.MemberForChef}
            onValueChange={(item: string) =>
              setData({ ...data, MemberForChef: item })
            }
          /> */}

          <Checkbox
            radius="full"
            classNames={{ label: "text-xs" }}
            isSelected={data.AvailableFor ? true : false}
            onValueChange={(item) => {
              console.log(item);
              setData({ ...data, AvailableFor: item })
            }
            }
            className="my-2"
          >
            I am available for Private Events/Brand endorsements.
          </Checkbox>
        </div>
      ),
    },
  ];







  useEffect(() => {
    console.log("data", data);
    setUpImage(null);
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
        <div className="h-[100vh] z-[99] bg-foreground-50 text-foreground-900 w-[100vw] left-0 fixed top-0">loading</div>
      ) : (

        <>
          {/* basic details  */}

          <Formik
            initialValues={data}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form >
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
                  className="max-w-xs block"
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

                {/* <Input
                type="text"
                variant="underlined"
                value={data.Establishment}
                onValueChange={(item: string) =>
                  setData({ ...data, Establishment: item })
                }
                name="Establishment"
                description="Where are you working currently?"
                label="Name of your Current Establishment"
              /> */}

                <Field
                  name="Establishment"
                  type="text"
                  as={Input}
                  value={data.Establishment}
                  onValueChange={(item: string) =>
                    setData({ ...data, Establishment: item })
                  }
                  variant="underlined"
                  label="Name of your Current Establishment"
                  description="Where are you working currently?"
                />

                <ErrorMessage name="Establishment" component="div" className="error" />

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
            </Form>
          </Formik>
        </>

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
