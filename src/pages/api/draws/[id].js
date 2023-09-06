import dbConnect from "../../../../db/connect";
import DrawModel from "../../../../db/models/DrawModel";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const draw = await DrawModel.findById(id);

    if (!draw) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(draw);
  }

  if (request.method === "DELETE") {
    const draw = await DrawModel.findByIdAndDelete(id);

    if (!draw) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(draw);
  }

  if (request.method === "PATCH") {
    const draw = await DrawModel.findByIdAndUpdate(id, request.body);
    console.log(request.body);
    if (!draw) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(draw);
  }
}
