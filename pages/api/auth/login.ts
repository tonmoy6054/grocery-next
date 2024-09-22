import { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "src/utils/connectDB";
import User from "src/models/User";
import bcrypt from "bcryptjs";

const authenticateUser = async (email: string, password: string) => {
  await dbConnect();

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return user;
  }
  return null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await authenticateUser(email, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      return res.status(200).json({ id: user._id, email: user.email });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
