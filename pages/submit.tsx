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
import { useState } from "react";
import Panel from "../parts/Panel";

export default function Submit() {
  const [titleInput, setTitleInput] = useState("");
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
            required
          />
          <Textarea placeholder="Description (optional)" minRows={5} autosize />
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            mt="sm"
          >
            Post
          </Button>
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
                  Add Post
                </Text>
              </Title>
              <Divider my="xs"/>
              <List >
                <List.Item>
                  View posts and pick up the latest topic
                </List.Item>
                <List.Item>Think what post will fit the topic</List.Item>
                <List.Item>Write your opinion about that topic</List.Item>
                <List.Item>Give it a little spice</List.Item>
                <List.Item>Now you&apos;re ready to post</List.Item>
              </List>
              <Divider my="xs"/>
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
