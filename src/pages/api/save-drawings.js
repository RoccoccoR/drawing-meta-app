import dbConnect from "../../../db/connect";
import Draw from "../../../db/models/DrawModel";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const drawings = await Draw.find();
      return response.status(200).json(drawings);
    } catch (error) {
      console.log(error);
      response.status(405).json({ message: "Method not allowed" });
    }
  } else if (request.method === "POST") {
    try {
      const { imageData, title, userId } = request.body;

      const newDrawing = new Draw({
        imageData,
        title,
        userId,
      });

      console.log("Received POST request to save a new drawing");
      console.log("Image Data:", imageData);
      console.log("Title:", title);
      console.log("User ID:", userId);

      await newDrawing.save();

      response.status(201).json({ status: "New drawing added" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
