import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  try {
    const { name, email, password } = await request.json();

    await connect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    return new NextResponse("User created", { status: 200 });
  } catch (err: any) {
    console.error("Error occurred:", err);
    return new NextResponse("Error occurred. Please try again.", {
      status: 500,
    });
  }
};
