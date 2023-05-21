import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedNextApiRequest extends NextApiRequest {
  json: () => Promise<any>;
}

export const POST = async (
  request: ExtendedNextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { userId, prompt, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();
    response.status(201).json(newPrompt);
  } catch (error) {
    response.status(500).json("Failed to create a new prompt");
  }
};
