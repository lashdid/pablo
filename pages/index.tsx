import {
  AppShell,
  Button,
  Text,
  Title,
  Navbar,
  useMantineTheme,
  MediaQuery,
  Aside,
  Footer,
  Burger,
  Header,
  Container,
  Paper,
} from "@mantine/core";
import { useState } from "react";

export default function AppShellDemo() {
  return (
    <AppShell
      header={
        <Header height={70} p="md">
          <Title order={1}>
            <Text
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              inherit
              component="span"
              style={{fontFamily: "'Hubballi', cursive"}}
            >
              PABLO
            </Text>
          </Title>
        </Header>
      }
    >
      <Container size='md' ml={0}>
        <Paper shadow="xs" p="md" sx={(theme) => ({backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.white})}>
          <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptatibus eum culpa eligendi eos eaque deserunt optio magnam molestias sit porro, blanditiis nostrum numquam perspiciatis voluptas corrupti vitae et voluptate iusto, distinctio quis minima ratione expedita nesciunt? Veritatis est provident sequi, numquam molestias quas inventore reiciendis natus, hic ipsum consequatur.</Text>
        </Paper>
      </Container>
    </AppShell>
  );
}
