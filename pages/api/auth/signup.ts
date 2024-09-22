import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "src/utils/connectDB";
import User from "src/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await dbConnect();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const newUser = new User({
        email,
        password: await bcrypt.hash(password, 10),
      });

      await newUser.save();

      return res.status(201).json({ id: newUser._id, email: newUser.email });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
