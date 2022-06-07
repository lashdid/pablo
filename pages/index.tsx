import { Text, Container, Grid, Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import Post from "../parts/home/Post";
import ReplyModal from "../parts/home/ReplyModal";
import Intro from "../parts/home/Intro";
import GoUpButton from "../parts/home/GoUpButton";

async function getPosts() {
  const endpoint = process.env.API_ENDPOINT;
  const req = await fetch(`${endpoint}/api/posts`);
  return await req.json();
}

async function addReply(id: string, data: any){
  const endpoint = process.env.API_ENDPOINT;
  await fetch(`${endpoint}/api/post/replies?id=${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

interface PostProps {
  _id: string;
  post_date: string;
  author: string;
  title: string;
  content: string;
  liked: boolean;
  disliked: boolean;
  like_count: number;
  dislike_count: number;
  replies_id: string
  reply_count: number;
  replies: [
    {
      id: number;
      replier: string;
      text: string;
    }
  ];
}

export default function Home() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [repliesId, setRepliesId] = useState("");
  const [replyOpened, setReplyOpened] = useState(false);
  const [replyLoaded, setReplyLoaded] = useState(false);
  const [replies, setReplies] = useState([{ id: 1, replier: "", text: "" }]);
  const [replyInput, setReplyInput] = useState("");

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
  }, [replies]);

  const getReplies = async (id: string) => {
    setReplyLoaded(false);
    const endpoint = process.env.API_ENDPOINT;
    const req = await fetch(`${endpoint}/api/post/replies?id=${id}`);
    const data = await req.json();
    setReplies(data.replies);
    setReplyLoaded(true);
  };

  interface ReactionProps {
    id: string;
    reaction: "liked" | "disliked";
    counterReaction: "liked" | "disliked";
    reactionCount: "like_count" | "dislike_count";
    counterReactionCount: "like_count" | "dislike_count";
  }

  const onClickModal = (id: string) => {
    setReplyOpened(true);
    setRepliesId(id)
    getReplies(id)
  };

  const onReact = (prop: ReactionProps) => {
    const newPosts = [...posts];
    for (let v of newPosts) {
      if (v._id == prop.id) {
        v[prop.reaction] = !v[prop.reaction];
        v[prop.reaction]
          ? (v[prop.reactionCount] += 1)
          : (v[prop.reactionCount] -= 1);
        v[prop.counterReaction] && (v[prop.counterReactionCount] -= 1);
        v[prop.counterReaction] = false;
      }
    }
    setPosts(newPosts);
  };

  const onReply = () => {
    if(replyInput != "" && repliesId){
      addReply(repliesId, {
        replier: "DeadFace69",
        text: replyInput,
      });
      getReplies(repliesId)
      setReplyInput("");
    }
  };

  return (
    <>
      <ReplyModal
        {...{
          replies,
          replyInput,
          replyLoaded,
          replyOpened,
          setReplyInput,
          setReplyOpened,
          onReply
        }}
      />
      <Container size="md" mb="4rem">
        <Grid grow>
          <Grid.Col span={6}>
            <Stack>
              {posts.map((post) => (
                <Post
                  key={post._id}
                  postDate={post.post_date}
                  author={post.author}
                  title={post.title}
                  likeCount={post.like_count}
                  onLiked={() =>
                    onReact({
                      id: post._id,
                      reaction: "liked",
                      counterReaction: "disliked",
                      reactionCount: "like_count",
                      counterReactionCount: "dislike_count",
                    })
                  }
                  dislikeCount={post.dislike_count}
                  onDisliked={() =>
                    onReact({
                      id: post._id,
                      reaction: "disliked",
                      counterReaction: "liked",
                      reactionCount: "dislike_count",
                      counterReactionCount: "like_count",
                    })
                  }
                  onClickReply={() => onClickModal(post.replies_id)}
                  replyCount={post.reply_count}
                >
                  <Text my="sm">{post.content}</Text>
                </Post>
              ))}
            </Stack>
          </Grid.Col>
          <Intro />
        </Grid>
      </Container>
      <GoUpButton/>
    </>
  );
}
