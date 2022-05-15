import {
  AppShell,
  Text,
  Title,
  Header
} from "@mantine/core";

export default function HeadPart(props: any) {
  const { title, children } = props;
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
              style={{ fontFamily: "'Hubballi', cursive" }}
            >
              {title}
            </Text>
          </Title>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
