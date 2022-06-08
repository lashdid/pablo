import { useHover } from "@mantine/hooks";
import {
  ActionIcon,
  Anchor,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { Messages, ThumbDown, ThumbUp } from "tabler-icons-react";
import { ReactElement, useState } from "react";

interface PostProps {
  author: string;
  postDate: string;
  title: string;
  likeCount: number;
  liked: boolean;
  onLiked: () => {};
  dislikeCount: number;
  onDisliked: () => {};
  replyCount: number;
  onClickReply: () => {};
  children: ReactElement;
}

function parseDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-Us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Post(props: any) {
  const post: PostProps = props;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { ref: like, hovered: likeHovered } = useHover();
  const { ref: dislike, hovered: dislikeHovered } = useHover();
  return (
    <Paper
      shadow="xs"
      p="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : "none",
        // borderColor: theme.colors.orange
      })}
      withBorder
    >
      <Text component="span" size="xs" color="grey">
        Posted by{" "}
        <Anchor
          size="xs"
          href="#"
          style={{ color: "gray" }}
        >
          {post.author}
        </Anchor>
        {" "}on {parseDate(post.postDate)}
      </Text>
      <Title order={3} my={5}>
        <Text
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          inherit
          component="span"
        >
          {post.title}
        </Text>
      </Title>
      <Divider />
      {post.children}
      <Group spacing="xs" align="flex-end">
        {/* <ActionIcon
          component="div"
          variant="transparent"
          sx={(theme) => ({
            color: likeHovered || liked ? theme.colors.orange[5] : "none",
            // borderColor: theme.colors.orange
          })}
          onClick={() => {
            disliked && setDisliked(false);
            setLiked(!liked);
            post.onLiked();
          }}
          ref={like}
        >
          <ThumbUp fill={liked ? "orange" : "none"} />
        </ActionIcon>
        <Text component="span">{post.likeCount}</Text>
        <ActionIcon
          component="div"
          variant="transparent"
          color={dislikeHovered ? "orange" : "gray"}
          sx={(theme) => ({
            color: dislikeHovered || disliked ? theme.colors.orange[5] : "none",
            // borderColor: theme.colors.orange
          })}
          onClick={() => {
            liked && setLiked(false);
            setDisliked(!disliked);
            post.onDisliked();
          }}
          ref={dislike}
        >
          <ThumbDown fill={disliked ? "orange" : "none"} />
        </ActionIcon>
        <Text component="span">{post.dislikeCount}</Text> */}
        <Button variant="subtle" color="gray" leftIcon={<Messages />} onClick={post.onClickReply} pl={5}>
          {post.replyCount} {" "} Replies
        </Button>
      </Group>
    </Paper>
  );
}
