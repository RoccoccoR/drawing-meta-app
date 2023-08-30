import dbConnect from "../../../../backend/db/db";
import DrawModel from "../../../../backend/db/models/draw";

export default async function handler(request, response) {
  try {
    await dbConnect();
    const { id } = request.query;

    if (request.method === "GET") {
      const draw = await DrawModel.findById(id);

      if (!draw) {
        return response.status(404).json({ status: "Not Found" });
      }

      console.log("Found draw:", draw);
      response.status(200).json(draw);
    }
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}
