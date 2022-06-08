// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connect();
  if (req.query.id) {
    const repliesData = db.collection("replies");
    const postsData = db.collection("posts");
    switch (req.method) {
      case "GET":
        const replies = await repliesData.findOne({
          _id: new ObjectId(`${req.query.id}`),
        });
        res.status(200).json(replies);
        break;
      case "PUT":
        repliesData.updateOne(
          { _id: new ObjectId(`${req.query.id}`) },
          { $push: { replies: { _id: new ObjectId(), ...req.body } } },
          async (err: string) => {
            if (err) return;
            await postsData.updateOne(
              { replies_id: new ObjectId(`${req.query.id}`) },
              { $inc: { reply_count: 1 } }
            );
          }
        );
        res.status(200)
    }
  } else {
    res.status(404).send("Not Found");
  }
}
