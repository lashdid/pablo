import { Divider, Paper, Text } from "@mantine/core";

type ReplyProps = {
  replier: string;
  text: string;
};

export default function Reply(props: any){
  const reply: ReplyProps = props;
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
      <Text
        variant="link"
        size="xs"
        component="a"
        href="#"
        style={{ color: "gray" }}
      >
        {reply.replier}
      </Text>
      <br />
      {reply.text}
    </Paper>
  );
}
