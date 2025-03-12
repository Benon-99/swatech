import { PrismaClient } from "@prisma/client";
import { DateTime } from "luxon";

const prisma = new PrismaClient();

const createSubmission = async ({ email, name, message }) => {
  const createdAt = DateTime.now().setZone("Asia/Damascus").toISO();
  try {
    const submission = await prisma.submission.create({
      data: { email, name, message, created_at: new Date(createdAt) },
    });
    console.log("Submission saved:", submission);
    return submission;
  } catch (error) {
    console.error("Error saving submission:", error);
    throw error;
  }
};

export default createSubmission; // Default export
