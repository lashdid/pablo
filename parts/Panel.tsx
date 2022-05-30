import { Paper } from "@mantine/core";
export default function Panel(props: any) {
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
      {props.children}
    </Paper>
  );
}
