import {
  Text,
  Container,
  Grid,
  Stack,
  Title,
  Affix,
  Transition,
  Button,
  Modal,
  Input,
  Group,
  ActionIcon,
  MediaQuery,
  Divider,
  List,
} from "@mantine/core";
import { useForceUpdate, useSetState, useWindowScroll } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { ArrowUp, Send, X } from "tabler-icons-react";
import Panel from "../parts/Panel";
import Post from "../parts/Post";
import Reply from "../parts/Reply";

async function getPosts() {
  const endpoint = process.env.API_ENDPOINT;
  const req = await fetch(`${endpoint}/api/posts`);
  return await req.json();
}

async function addReply(id: number, data: any) {
  const endpoint = process.env.API_ENDPOINT;
  Promise.all([
    fetch(`${endpoint}/api/post/replies?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
    fetch(`${endpoint}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        change: "reply-counter",
        id: id,
      }),
    }),
  ]);
}

export default function Home() {
  interface PostProps {
    id: number;
    author: string;
    title: string;
    content: string;
    liked: boolean;
    disliked: boolean;
    likeCount: number;
    dislikeCount: number;
    replyCount: number;
    replies: [
      {
        id: number;
        replier: string;
        text: string;
      }
    ];
  }

  
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      setPosts(res);
    });
  });

  const [scroll, scrollTo] = useWindowScroll();

  const [postId, setPostId] = useState(1);
  const [replyOpened, setReplyOpened] = useState(false);
  const [replyLoaded, setReplyLoaded] = useState(false);
  const [replies, setReplies] = useState([{ id: 1, replier: "", text: "" }]);
  const [replyInput, setReplyInput] = useState("");

  const getReplies = useCallback(async () => {
    setReplyLoaded(false);
    const endpoint = process.env.API_ENDPOINT;
    const req = await fetch(`${endpoint}/api/post/replies?id=${postId}`);
    const data = await req.json();
    setReplies(data.replies);
    setReplyLoaded(true);
  }, [postId]);

  //get and set reply modal by postid
  useEffect(() => {
    getReplies();
  }, [getReplies]);

  interface ReactionProps {
    id: number;
    reaction: "liked" | "disliked";
    counterReaction: "liked" | "disliked";
    reactionCount: "likeCount" | "dislikeCount";
    counterReactionCount: "likeCount" | "dislikeCount";
  }

  const onClickReply = (id: number) => {
    setPostId(id);
    setReplyOpened(true);
  };

  const onReact = (prop: ReactionProps) => {
    const newPosts = [...posts];
    for (let v of newPosts) {
      if (v.id == prop.id) {
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
    if (replyInput != "") {
      addReply(postId, {
        id: Math.floor(Math.random() * 9999),
        replier: "DeadFace69",
        text: replyInput,
      });
      getReplies();
      setReplyInput("");
    }
  };

  return (
    <>
      <Modal
        zIndex={250}
        size="lg"
        centered
        opened={replyOpened}
        onClose={() => setReplyOpened(false)}
        withCloseButton={false}
        styles={{ inner: { overflow: "hidden" } }}
      >
        <Grid justify="space-between" mb="sm">
          <Title order={3} my={5}>
            <Text
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              inherit
              component="span"
            >
              Replies
            </Text>
          </Title>
          <ActionIcon onClick={() => setReplyOpened(false)}>
            <X />
          </ActionIcon>
        </Grid>
        {replyLoaded ? (
          replies.length > 0 ? (
            <div style={{ height: "65vh", overflow: "auto" }}>
              <Stack>
                {replies.map((v) => (
                  <Reply key={v.id} replier={v.replier} text={v.text} />
                ))}
              </Stack>
            </div>
          ) : (
            <Text size="xs" component="span" style={{ color: "gray" }}>
              No Replies
            </Text>
          )
        ) : (
          <Text size="xs" component="span" style={{ color: "gray" }}>
            Loading...
          </Text>
        )}
        <Group noWrap>
          <Input
            my="sm"
            variant="default"
            placeholder="Reply to this post"
            style={{ width: "100%" }}
            value={replyInput}
            onInput={(e: any) => setReplyInput(e.target.value)}
          />
          <ActionIcon variant="filled" color="orange" onClick={onReply}>
            <Send size={16} />
          </ActionIcon>
        </Group>
      </Modal>
      <Container size="md" mb="4rem">
        <Grid grow>
          <Grid.Col span={6}>
            <Stack>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  author={post.author}
                  title={post.title}
                  likeCount={post.likeCount}
                  onLiked={() =>
                    onReact({
                      id: post.id,
                      reaction: "liked",
                      counterReaction: "disliked",
                      reactionCount: "likeCount",
                      counterReactionCount: "dislikeCount",
                    })
                  }
                  dislikeCount={post.dislikeCount}
                  onDisliked={() =>
                    onReact({
                      id: post.id,
                      reaction: "disliked",
                      counterReaction: "liked",
                      reactionCount: "dislikeCount",
                      counterReactionCount: "likeCount",
                    })
                  }
                  onClickReply={() => onClickReply(post.id)}
                  replyCount={post.replyCount}
                >
                  <Text my="sm">{post.content}</Text>
                </Post>
              ))}
            </Stack>
          </Grid.Col>
          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Grid.Col span={2}>
              <Panel>
                <Title order={1}>
                  <Text
                    variant="gradient"
                    gradient={{ from: "orange", to: "red" }}
                    inherit
                    component="span"
                  >
                    Welcome
                  </Text>
                </Title>
                <Divider my="xs" />
                <Text>Here you can post almost anything.</Text>
                <List>
                  <List.Item>Poll</List.Item>
                  <List.Item>Video</List.Item>
                  <List.Item>Audio</List.Item>
                  <List.Item>Discussion</List.Item>
                  <List.Item>Just Asking</List.Item>
                </List>
                <Button
                  component="a"
                  href="submit"
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  mt="sm"
                  style={{ width: "100%" }}
                >
                  Add Post
                </Button>
              </Panel>
            </Grid.Col>
          </MediaQuery>
        </Grid>
      </Container>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              leftIcon={<ArrowUp />}
              style={transitionStyles}
              color="orange"
              onClick={() => scrollTo({ y: 0 })}
            >
              Scroll to top
            </Button>
          )}
        </Transition>
      </Affix>
    </>
  );
}
