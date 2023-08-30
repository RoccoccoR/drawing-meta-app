import dbConnect from "../../../../backend/db/db";
import DrawModel from "../../../../backend/db/models/draw";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const drawings = await DrawModel.find();
      console.log("Drawings:", drawings);
      return response.status(200).json(drawings);
    } else {
      return response.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
