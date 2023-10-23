import { z } from "zod";
import * as Yup from "yup";

export const currentDesignation = [
  "Artisanal Baker",
  "Banquet Chef",
  "Catering Chef",
  "Catering Manager",
  "Celebrity Chef",
  "Chef de Cuisine",
  "Chef de Partie",
  "Consulting Chef",
  "Corporate Chef",
  "Culinary Consultant",
  "Culinary Director",
  "Culinary Instructor",
  "Culinary Producer",
  "Culinary Researcher",
  "Executive Chef",
  "Food Blogger",
  "Food Critic",
  "Food Stylist",
  "Garde Manger Chef",
  "Gourmet Chef",
  "Head Chef",
  "Hotel Chef",
  "Line Cook",
  "Master Chef",
  "Nutrition Chef",
  "Pastry Chef",
  "Pastry Sous Chef",
  "Personal Chef",
  "Plant-Based Chef",
  "Private Chef",
  "Research and Development Chef",
  "Restaurant Owner",
  "Saucier",
  "Sous Chef",
  "Teaching Chef",
  "Test Kitchen Chef",
  "Vegan Chef",
];

export const cities = [
  "Agra",
  "Ahmedabad",
  "Amritsar",
  "Bangalore",
  "Bhopal",
  "Bhubaneswar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Dehradun",
  "Gandhinagar",
  "Guwahati",
  "Hyderabad",
  "Indore",
  "Jaipur",
  "Jammu",
  "Kochi",
  "Kolkata",
  "Lucknow",
  "Mumbai",
  "Nagpur",
  "New Delhi",
  "Outside India",
  "Other",
  "Patna",
  "Pune",
  "Raipur",
  "Ranchi",
  "Shimla",
  "Thiruvananthapuram",
  "Varanasi",
  "Visakhapatnam",
];

export const educationOptions = [
  "High School Diploma or Equivalent",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate or Ph.D.",
];
// Sort the array alphabetically
cities.sort();

export const CuisineSpecialization = [
  "Catering Services",
  "Celebrity Chefs",
  "Cooking Classes",
  "Culinary Consulting",
  "Culinary Educators",
  "Desserts and Pastry",
  "Fine Dining",
  "Food Bloggers",
  "Food Styling and Photography",
  "Fusion Cuisine",
  "Home Cooks and Amateurs",
  "Indian Cuisine",
  "International Cuisine",
  "Private Dining Experiences",
  "Regional Cuisine",
  "Restaurant Chefs",
  "Seafood Specialties",
  "Street Food",
  "Vegan Cuisine",
  "Vegetarian Cuisine",
];

export const SpecialTags = [
  "Artisanal Baker",
  "Award-Winning Chef",
  "Cookbook Author",
  "Cooking Show Host",
  "Curry Maestro",
  "Dessert Artisan",
  "Farm-to-Table Advocate",
  "Food Critic",
  "Healthy Cooking",
  "MasterChef India Contestant",
  "Michelin-Starred Chef",
  "Molecular Gastronomy",
  "Sustainable Cooking",
  "Spice Expert",
  "Tandoor Specialist",
  "Traditional Cooking Methods",
  "Wine and Food Pairing",
];

export const UserSchema = z.object({
  name: z.string().min(3).max(255),
  role: z.string(),
  email: z.string().email(),
  emailVerified: z.date().optional(),
  phone: z.string(),
  currentDes: z.string().optional(),
  Establishment: z.string().optional(),
  City: z.string().optional(),
  Address: z.string().optional(),
  Education: z.string().optional(),
  Experience: z.number().optional(),
  Intro: z.string().optional(),
  image: z.string().optional(),
  linkedin: z.string().optional(),
  instagram: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  snapchat: z.string().optional(),
  twitter: z.string().optional(),
  ChefImage: z.string().optional(),
  Awards: z.string().optional(),
  CuisineSpecialization: z.array(z.string()).optional(),
  PrevWork: z.string().optional(),
  SignatureDish: z.array(z.string()).optional(),
  Speciality: z.array(z.string()).optional(),
  BrandEndorsed: z.string().optional(),
  MediaAppearance: z.string().optional(),
  AvailableFor: z.boolean().optional(),
  MemberForChef: z.string().optional(),
});

export const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).max(255).required(),
  role: Yup.string().required(),
  email: Yup.string().email().required(),
  // emailVerified: Yup.date().nullable(),
  phone: Yup.string().nullable(),
  currentDes: Yup.string().nullable(),
  Establishment: Yup.string().nullable(),

  // Establishment: Yup.string().max(5,"kya kar raha hai bhai").nullable(),
  City: Yup.string().nullable(),
  Address: Yup.string().nullable(),
  Education: Yup.string().nullable(),
  Experience: Yup.number().nullable(),
  Intro: Yup.string().test("word-limit", "Exceeded word limit!", (value) => {
    if (!value) {
      return true;
    }
    const words = value.split(" ");
    // console.log("ye hai establishment: ",words);
    return words.length < 50;
  }).nullable(),
  image: Yup.string().nullable(),
  linkedin: Yup.string().nullable(),
  instagram: Yup.string().nullable(), 
  website: Yup.string().nullable(),
  facebook: Yup.string().nullable(),
  snapchat: Yup.string().nullable(),
  twitter: Yup.string().nullable(),
  ChefImage: Yup.string().nullable(),
  Awards: Yup.string().test("word-limit", "Exceeded word limit!", (value) => {
    if (!value) {
      return true;
    }
    const words = value.split(" ");
    // console.log("ye hai establishment: ",words);
    return words.length < 50;
  }).nullable(),
  CuisineSpecialization: Yup.array().of(Yup.string()).nullable(),
  PrevWork: Yup.string().nullable(),
  SignatureDish: Yup.array().of(Yup.string()).nullable(),
  Speciality: Yup.array().of(Yup.string()).nullable(),
  BrandEndorsed: Yup.string().nullable(),
  MediaAppearance: Yup.string()
    .max(200, "Limit exceeded. Pls make it short!")
    .nullable(),
  AvailableFor: Yup.boolean().nullable(),
  MemberForChef: Yup.string()
    .max(200, "Limit exceeded. Pls make it short!")
    .nullable(),
});
