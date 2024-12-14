"use client";

import { Button, Container, Group, Text, Title } from "@mantine/core";
import { IconArrowRight, IconStar } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import classes from "./HeroSection.module.css";

export function HeroSection() {
  const router = useRouter();

  return (
    <Container pt="sm" size="lg">
      <div className={classes.inner}>
        <Title className={classes.title}>LocciWallet</Title>
        {/* <Title className={classes.subtitle}>
          Your wallet of choice 
        </Title> */}

        <Text className={classes.description} mt={30}>
          Launch multiple wallets for different accounts.
        </Text>

        <Group mt={40}>
          <Button
            size="lg"
            className={classes.control}
            onClick={() => {
              router.push("/dashboard");
            }}
            rightSection={<IconArrowRight />}
          >
            Sign Up
          </Button>
          {/* <Button
            variant="outline"
            size="lg"
            className={classes.control}
            onClick={() => {
              // open github project
              window.open("https://github.com/MikeTeddyOmondi/locci-wallet");
            }}
            rightSection={<IconStar />}
          >
            About Us
          </Button> */}
        </Group>
      </div>
    </Container>
  );
}
