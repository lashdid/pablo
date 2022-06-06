import { Button, Divider, Grid, List, MediaQuery, Text, Title } from "@mantine/core";
import Panel from "../Panel";

export default function Intro() {
  return (
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
  );
}
