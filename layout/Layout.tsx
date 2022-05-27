import {
  AppShell,
  Text,
  Title,
  Header,
  Grid,
  Group,
  Avatar
} from "@mantine/core";

export default function Layout(props: any) {
  const { title, children } = props;
  return (
    <AppShell
      header={
        <Header height={70} pt="lg" px="lg">
          <Grid justify="space-between">
            <Title order={1}>
              <Text
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                inherit
                component="span"
                style={{ fontFamily: "'Hubballi', cursive" }}
              >
                {title}
              </Text>
            </Title>
            <Group>
              <Text
                variant="link"
                component="a"
                href="#"
                style={{ color: "gray" }}
              >
                DeadFace69
              </Text>
              <Avatar radius="xl" />
            </Group>
          </Grid>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
