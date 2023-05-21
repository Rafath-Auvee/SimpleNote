import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(request.query.id).populate("creator");
    if (!prompt) {
      response.status(404).json("Prompt Not Found");
      return;
    }

    response.status(200).json(prompt);
  } catch (error) {
    response.status(500).json("Internal Server Error");
  }
};

export const PATCH = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { prompt, tag } = await request.body;

  try {
    await connectToDB();

    // Find the existing prompt by ID
    const existingPrompt = await Prompt.findById(request.query.id);

    if (!existingPrompt) {
      response.status(404).json("Prompt not found");
      return;
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    response.status(200).json("Successfully updated the Prompts");
  } catch (error) {
    response.status(500).json("Error Updating Prompt");
  }
};

export const DELETE = async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(request.query.id);

    response.status(200).json("Prompt deleted successfully");
  } catch (error) {
    response.status(500).json("Error deleting prompt");
  }
};
