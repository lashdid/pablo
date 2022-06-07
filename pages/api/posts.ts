// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../lib/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db } = await connect();
  const postsData = db.collection("posts");
  switch (req.method) {
    case "GET":
      const posts = await postsData.find().sort({ $natural: -1 }).toArray();
      res.status(200).json(posts);
      break;
    case "POST":
      const replyData: { _id?: ObjectId; replies: [] } = {
        replies: [],
      };
      db.collection("replies").insertOne(replyData, (err: string) => {
        if (err) return;
        postsData.insertOne({
          post_date: new Date(),
          author: req.body.author,
          title: req.body.title,
          content: req.body.content,
          liked: false,
          disliked: false,
          dislike_count: 0,
          like_count: 0,
          replies_id: replyData._id,
          reply_count: 0,
        });
      });
  }
}
