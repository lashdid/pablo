import { Affix, Button, Transition } from "@mantine/core";
import { ArrowUp } from "tabler-icons-react";
import { useWindowScroll } from "@mantine/hooks";

export default function GoUpButton() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            variant="gradient"
            gradient={{ from: "orange", to: "red" }}
            leftIcon={<ArrowUp />}
            style={transitionStyles}
            color="orange"
            onClick={() => scrollTo({ y: 0 })}
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}
