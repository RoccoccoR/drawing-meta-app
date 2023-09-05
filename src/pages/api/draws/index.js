import dbConnect from "../../../../db/connect";
import Draw from "../../../../db/models/DrawModel";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const draws = await Draw.find();

      if (!draws) {
        return response.status(404).json({ status: "Not Found" });
      }

      console.log("Found draws:", draws);
      return response.status(200).json(draws);
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  } else if (request.method === "POST") {
    try {
      const { imageData /* other data */ } = request.body;
      console.log("Request body:", request.body);
      // Create a new Draw document and save it to the database
      const newDraw = new Draw({ imageData /* other data */ });
      await newDraw.save();
      console.log("Drawing saved successfully:", newDraw);
      return response
        .status(201)
        .json({ message: "Drawing saved successfully" });
    } catch (error) {
      console.error("Error saving drawing:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}
