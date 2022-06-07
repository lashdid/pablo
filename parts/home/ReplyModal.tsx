import {
  ActionIcon,
  Grid,
  Group,
  Input,
  Modal,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Send, X } from "tabler-icons-react";
import Reply from "./Reply";


interface ReplyProps {
  _id: string;
  replier: string;
  text: string;
}

interface ModalProps {
  replies: ReplyProps[],
  replyLoaded: boolean
  replyOpened: boolean,
  replyInput: string,
  setReplyOpened: (setOpened: boolean) => {}
  setReplyInput: (setInput: string) => {}
  onReply: () => {}
}

export default function ReplyModal(props: any) {
  const modal: ModalProps = props
  
  return (
    <Modal
      zIndex={250}
      size="lg"
      centered
      opened={modal.replyOpened}
      onClose={() => modal.setReplyOpened(false)}
      withCloseButton={false}
      styles={{ inner: { overflow: "hidden" } }}
    >
      <Grid justify="space-between" mb="sm">
        <Title order={3} my={5}>
          <Text
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            inherit
            component="span"
          >
            Replies
          </Text>
        </Title>
        <ActionIcon onClick={() => modal.setReplyOpened(false)}>
          <X />
        </ActionIcon>
      </Grid>
      {modal.replyLoaded ? (
        modal.replies.length > 0 ? (
          <div style={{ height: "65vh", overflow: "auto" }}>
            <Stack>
              {modal.replies.map((v) => (
                <Reply key={v._id} replier={v.replier} text={v.text} />
              ))}
            </Stack>
          </div>
        ) : (
          <Text size="xs" component="span" style={{ color: "gray" }}>
            No Replies
          </Text>
        )
      ) : (
        <Text size="xs" component="span" style={{ color: "gray" }}>
          Loading...
        </Text>
      )}
      <Group noWrap>
        <Input
          my="sm"
          variant="default"
          placeholder="Reply to this post"
          style={{ width: "100%" }}
          value={modal.replyInput}
          onInput={(e: any) => modal.setReplyInput(e.target.value)}
        />
        <ActionIcon variant="filled" color="orange" onClick={modal.onReply}>
          <Send size={16} />
        </ActionIcon>
      </Group>
    </Modal>
  );
}
