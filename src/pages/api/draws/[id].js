import dbConnect from "../../../../backend/db/db";
import DrawModel from "../../../../backend/db/models/draw";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const draw = await DrawModel.findById(id);
    console.log(draw);

    if (!draw) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(draw);
  }
}
