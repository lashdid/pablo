import {
    Text,
    Container,
    Paper,
    Grid,
    Stack,
    Title,
    Divider,
    List,
  } from "@mantine/core";
export default function Intro() {
  return (
    <Paper
      shadow="xs"
      p="md"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.white,
      })}
    >
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
    </Paper>
  );
}
