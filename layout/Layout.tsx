import {
  AppShell,
  Text,
  Title,
  Header,
  Grid,
  Group,
  Avatar,
  ActionIcon,
  MediaQuery
} from "@mantine/core";
import { Plus } from "tabler-icons-react";

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
              <MediaQuery largerThan="md" styles={{display: 'none'}}>
                <ActionIcon component="a" href="/submit" variant="filled" color='orange' radius='xl' size='lg'><Plus size={16} /></ActionIcon>
              </MediaQuery>
            </Group>
          </Grid>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
