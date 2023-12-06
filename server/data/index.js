import bcrypt from "bcrypt";
import User from "../models/User.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

/*configurations*/
dotenv.config();

export const users = [
  {
    firstName: "Admin",
    lastName: "User",
    email: "test.user2@email.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    role: 'Admin',
    preference: 'Food',
    __v: 0,
  }
];

const insertData = async () => {
  try {
    for (const user of users) {
      // Your async code here
      const salt = await bcrypt.genSalt();
      const passwordhash = await bcrypt.hash(user.password, salt);
      const NewUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: passwordhash,
        picturePath: user.picturePath,
        location: user.location,
        occupation: user.occupation,
        viewedProfile: Math.floor(Math.random() * 1000),
        impression: Math.floor(Math.random() * 1000),
        preference: user.preference,
        role: 'Admin'
      });
      const savedUser = await NewUser.save();
      console.log(savedUser)
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
  }
};

mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    insertData();
  })
  .catch((error) => console.log(`Insert error: ${error}}`));

