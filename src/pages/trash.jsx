{/* <Accordion
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
            </Accordion> */}