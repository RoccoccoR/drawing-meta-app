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
      response.status(200).json(draws);
    } catch (error) {
      console.error("Error:", error);
      response.status(500).json({ message: "Internal Server Error" });
    }
  }
}
