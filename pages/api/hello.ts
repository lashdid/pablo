// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

let posts = [{
  id: 1,
  author: "ShrekTheThird",
  title: "Why am i lonely?",
  content:
    "There is nothing to hide in here. Is it bad? Is it good? Nobody knows the answer. The system of this universe makes us felt something that lead to depressed.",
  liked: false,
  disliked: false,
  likeCount: 0,
  dislikeCount: 10,
  replies: [],
},
{
  id: 2,
  author: "Kicker45",
  title: "Do you guys knows about time relativity?",
  content: "I'm just confused, i mean what do you think about that?",
  liked: false,
  disliked: false,
  likeCount: 5,
  dislikeCount: 1,
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
  author: "RickMaster69",
  title: "Is there someone who never gives up?",
  content:
    "I never knew someone who never gives up, and someone who never let anybody down, also someone who never running around, and dessert anybody. Can someone find this person?",
  liked: false,
  disliked: false,
  likeCount: 20,
  dislikeCount: 0,
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
  author: "PickleRickNoob",
  title: "What is the funniest thing you've ever seen?",
  liked: false,
  disliked: false,
  likeCount: 7,
  dislikeCount: 1,
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
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method === 'GET'){
    // do something please
  }
  if(req.method === 'POST'){
    posts = [{
      id: req.body.id,
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      liked: false,
      disliked: false,
      likeCount: 0,
      dislikeCount: 0,
      replies: [],
    }, ...posts]
  }
  res.status(200).json(posts)
}
