// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../../lib/dbConnect";

let postReplies = [
  {
    id: 1,
    replies: [],
  },
  {
    id: 2,
    replies: [
      {
        id: 1,
        replier: "Boomer123",
        text: "This is hard",
      },
      {
        id: 2,
        replier: "TheNeighborsKid",
        text: "Well, go ask albert einstein",
      },
    ],
  },
  {
    id: 3,
    replies: [
      {
        id: 1,
        replier: "Kicker45",
        text: "LMAO, its rickroll",
      },
      {
        id: 2,
        replier: "Bot#123",
        text: "This is deep",
      },
    ],
  },
  {
    id: 4,
    replies: [
      {
        id: 1,
        replier: "Gamer69",
        text: "Pickle rick, this is an old meme",
      },
      {
        id: 2,
        replier: "LolXD",
        text: "IM PICKLE RIIIICK",
      },
      {
        id: 3,
        replier: "Idkwhy",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit maxime, recusandae quidem vel nobis in enim cumque laudantium ab blanditiis!",
      },
      {
        id: 4,
        replier: "Idkwhy",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit maxime, recusandae quidem vel nobis in enim cumque laudantium ab blanditiis!",
      },
      {
        id: 5,
        replier: "Idkwhy",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit maxime, recusandae quidem vel nobis in enim cumque laudantium ab blanditiis!",
      },
      {
        id: 6,
        replier: "Idkwhy",
        text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit maxime, recusandae quidem vel nobis in enim cumque laudantium ab blanditiis!",
      },
    ],
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.id) {
      const { db } = await connect();

      const replies = await db.collection("replies")
      .findOne({_id: new ObjectId(`${req.query.id}`)})

      res.status(200).json(replies);
    }
    else{
      res.status(404).send("Not Found");
    }
  }
  if (req.method === "POST") {
    if(req.body.change === 'add-post'){
      postReplies = [{
        id: req.body.id,
        replies: []
      }, ...postReplies]
    }else{
      postReplies.forEach((v) => {
        if(v.id.toString() == req.query.id){
          v.replies.push(req.body)
        }
      })
    }
  }
}
