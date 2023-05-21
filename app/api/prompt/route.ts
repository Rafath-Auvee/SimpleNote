import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json("Failed to fetch all prompts");
  }
};

