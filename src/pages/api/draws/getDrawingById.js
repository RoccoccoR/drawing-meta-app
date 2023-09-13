import dbConnect from "../../../../db/connect";
import Draw from "../../../../db/models/DrawModel";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const { id } = request.query; // Get the drawing ID from the request query

      const draw = await Draw.findById(id); // Find the drawing by its ID

      console.log("Draw:________________________", draw);

      if (!draw) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(draw);
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return response.status(405).json({ message: "Method Not Allowed" });
  }
}
