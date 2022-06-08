import {
  Grid,
  MediaQuery,
  Container,
  Textarea,
  TextInput,
  Button,
  Divider,
  Text,
  Title,
  List,
  Paper,
  ActionIcon,
  Space,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { X } from "tabler-icons-react";
import Panel from "../parts/Panel";

async function addPosts(data: any) {
  const endpoint = process.env.API_ENDPOINT;
  await fetch(`${endpoint}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export default function Submit() {
  const router = useRouter();
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(files);
  }, [files]);

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
          <Paper
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.white,
            })}
          >
            <Dropzone
              onDrop={(dataFiles) => {
                const mockFiles = [...files];
                mockFiles.push(...dataFiles);
                setFiles(mockFiles);
              }}
              onReject={(files) =>
                alert("File type is not supported or file is too big")
              }
              maxSize={3 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              mb="sm"
            >
              {(status) => (
                <>
                  <Text color="gray">
                    <small>Click or drop file here to upload (optional)</small>
                  </Text>
                </>
              )}
            </Dropzone>
            {files.length != 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: "0 .5rem .5rem .5rem",
                }}
              >
                {files.map((file) => {
                  return (
                    <Paper
                      key={file.lastModified}
                      style={{ display: "flex", alignContent: "center" }}
                      m={2}
                      px={5}
                      py={2}
                    >
                      <Text lineClamp={1} size="sm">
                        {file.name.length > 20
                          ? file.name.slice(0, 20) + "..."
                          : file.name}
                      </Text>
                      <ActionIcon
                        size="xs"
                        ml="sm"
                        onClick={() => {
                          const mockFiles = [...files];
                          const filtered = mockFiles.filter(
                            (v) => v.lastModified != file.lastModified
                          );
                          setFiles(filtered);
                        }}
                      >
                        <X />
                      </ActionIcon>
                    </Paper>
                  );
                })}
              </div>
            )}
          </Paper>
          <Space h="md" />
          <Textarea
            placeholder="Description (optional)"
            onInput={(e: any) => setContentInput(e.target.value)}
            minRows={5}
            autosize
          />
          <Space h="md" />
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            onClick={() => {
              if (titleInput === "") {
                setError("Title is required");
              } else {
                addPosts({
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
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Button
              ml="sm"
              component="a"
              variant="outline"
              color="gray"
              href="/"
            >
              Back
            </Button>
          </MediaQuery>
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
