import {
  Grid,
  MediaQuery,
  Container,
  Input,
  Textarea,
  TextInput,
  Button,
  Divider,
  Text,
  Title,
  List,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import Panel from "../parts/Panel";

async function addPosts(data: any) {
  const endpoint = process.env.API_ENDPOINT;
  const req = await fetch(`${endpoint}/api/hello`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await req.json();
}

export default function Submit() {
  const router = useRouter();
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [error, setError] = useState("");
  return (
    <Container size="md">
      <Grid grow>
        <Grid.Col span={6}>
          <TextInput
            my="sm"
            variant="default"
            label="Title"
            value={titleInput}
            onInput={(e: any) => setTitleInput(e.target.value)}
            error={error}
            required
          />
          <Textarea
            placeholder="Description (optional)"
            onInput={(e: any) => setContentInput(e.target.value)}
            minRows={5}
            autosize
          />
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            mt="sm"
            onClick={() => {
              if (titleInput === "") {
                setError("Title is required");
              } else {
                addPosts({
                  id: Math.floor(Math.random() * 9999),
                  author: "DeadFace69",
                  title: titleInput,
                  content: contentInput,
                });
                router.push("/");
              }
            }}
          >
            Post
          </Button>
        </Grid.Col>
        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Grid.Col span={2}>
            <Panel>
              <Title order={2}>
                <Text
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                  inherit
                  component="span"
                >
                  Add Post
                </Text>
              </Title>
              <Divider my="xs" />
              <List>
                <List.Item>View posts and pick up the latest topic</List.Item>
                <List.Item>Think what post will fit the topic</List.Item>
                <List.Item>Write your opinion about that topic</List.Item>
                <List.Item>Give it a little spice</List.Item>
                <List.Item>Now you&apos;re ready to post</List.Item>
              </List>
              <Divider my="xs" />
              <small>Not ready yet?</small>
              <Button
                component="a"
                href="/"
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                mt="sm"
                style={{ width: "100%" }}
              >
                Go Back
              </Button>
            </Panel>
          </Grid.Col>
        </MediaQuery>
      </Grid>
    </Container>
  );
}
