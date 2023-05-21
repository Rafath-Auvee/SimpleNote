import { NextApiRequest, NextApiResponse } from "next";
import { connectToDB } from "@utils/database";
import Prompt, { IPrompt } from "@models/prompt";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> {
  try {
    await connectToDB();

    const { id } = request.query;

    const prompts: IPrompt[] = await Prompt.find({ creator: id }).populate(
      "creator"
    );

    response.status(200).json(prompts);
  } catch (error) {
    response
      .status(500)
      .json({ error: "Failed to fetch prompts created by user" });
  }
}
