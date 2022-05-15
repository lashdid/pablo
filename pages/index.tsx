import {
  Text,
  Container,
  Paper,
  Grid,
  Stack,
  Title,
  Divider,
  List,
  Affix,
  Transition,
  Button,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";
import { ArrowUp } from "tabler-icons-react";
import HeadPart from "../layout/Header";
import Intro from "../parts/Intro";
import Post from "../parts/Post";


export default function Home() {
  const [scroll, scrollTo] = useWindowScroll();

  const [posts, setPosts ] = useState([
    {
      id: 1,
      author: "ShrekTheThird",
      title: "Why am i lonely?",
      content:
        "There is nothing to hide from here. Is it bad? Is it good? Nobody knows the answer. The system of this universe makes us felt something that lead to depressed.",
      liked: false,
        likeCount: 0,
      dislikeCount: 10,
      replyCount: 0,
    },
    {
      id: 2,
      author: "Kicker45",
      title: "Do you guys knows about time relativity?",
      content: "I'm just confused, i mean what do you think about that?",
      liked: false,
      likeCount: 5,
      dislikeCount: 1,
      replyCount: 2,
    },
    {
      id: 3,
      author: "RickMaster69",
      title: "Is there someone who never gives up?",
      content:
        "I never knew someone who never gives up, and someone who never let anybody down, also someone who never running around, and dessert anybody. Can someone find this person?",
      liked: false,
        likeCount: 20,
      dislikeCount: 0,
      replyCount: 4,
    },
    {
      id: 4,
      author: "PickleRickNoob",
      title: "What is the funniest thing you've ever seen?",
      liked: false,
      likeCount: 7,
      dislikeCount: 1,
      replyCount: 4,
    },
  ]);

  const onLiked = (post: any) => {
    const newPosts = [...posts];
    newPosts.forEach(v => {
      if(v.id == post.id){
        v.liked = !v.liked
        v.liked ? v.likeCount += 1 : v.likeCount -= 1 
      }
    });
    setPosts(newPosts)
  }

  return (
    <HeadPart title="PABLO">
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
                  onLiked={() => onLiked(post)}
                  dislikeCount={post.dislikeCount}
                  replyCount={post.replyCount}
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
    </HeadPart>
  );
}
