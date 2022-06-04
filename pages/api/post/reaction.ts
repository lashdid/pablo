// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

let postReaction = [{
  id: 1,
  liked: false,
  disliked: false,
  likeCount: 0,
  dislikeCount: 10,
},
{
  id: 2,
  liked: false,
  disliked: false,
  likeCount: 5,
  dislikeCount: 1,
},
{
  id: 3,
  liked: false,
  disliked: false,
  likeCount: 20,
  dislikeCount: 0,
},
{
  id: 4,
  liked: false,
  disliked: false,
  likeCount: 7,
  dislikeCount: 1,
}]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.id) {
      const reaction = postReaction.filter((v) =>  v.id.toString() == req.query.id);
      reaction.length ? res.status(200).json(reaction) : res.status(404).send("Not Found")
    }
    else{
      res.status(404).send("Not Found");
    }
  }
  if (req.method === "POST") {
    // do something here
  }
}
