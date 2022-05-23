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
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";
import { ArrowUp, Send } from "tabler-icons-react";
import Layout from "../layout/Layout";
import Intro from "../parts/Intro";
import Post from "../parts/Post";
import Reply from "../parts/Reply";

export default function Home() {
  const [scroll, scrollTo] = useWindowScroll();

  const [posts, setPosts] = useState([
    {
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
    },
  ]);

  const [replyOpened, setReplyOpened] = useState(false);
  const [replies, setReplies] = useState([{ id: 1, replier: "", text: "" }]);

  type ReactionProps = {
    id: number;
    reaction: "liked" | "disliked";
    counterReaction: "liked" | "disliked";
    reactionCount: "likeCount" | "dislikeCount";
    counterReactionCount: "likeCount" | "dislikeCount";
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

  return (
    <Layout title="PABLO">
      <Modal
        size="lg"
        centered
        opened={replyOpened}
        onClose={() => setReplyOpened(false)}
      >
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
        {replies.length > 0 ? (
          <div style={{height: '65vh', overflow: 'auto'}}>
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
        )}
        <Group noWrap>
          <Input my='sm' variant="default" placeholder="Reply this post" style={{width: '100%'}}/>
          <ActionIcon variant="filled" color="orange"><Send size={16} /></ActionIcon>
        </Group>
      </Modal>
      <Container size="md">
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
                      counterReactionCount: "likeCount"
                    })
                  }
                  onClickReply={() => {
                    setReplies(post.replies);
                    setReplyOpened(true);
                  }}
                  replyCount={post.replies.length}
                >
                  <Text my="sm">{post.content}</Text>
                </Post>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Intro />
          </Grid.Col>
        </Grid>
      </Container>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
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
    </Layout>
  );
}
