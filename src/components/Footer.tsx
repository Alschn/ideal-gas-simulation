import React from "react";
import { Text, Link, Box, Flex } from "@chakra-ui/react";
import P5Image from "../assets/p5js.svg";
import ChakraImage from "../assets/chakra.svg";
import ReactImage from "../assets/react.svg";
import TSImage from "../assets/ts.svg";

const Footer: React.FC = () => {
  return (
    <Box position="absolute" bottom={0}>
      <Flex justify="center" align="center">
        <a href="https://reactjs.org/" target="_blank">
          <img
            height={24}
            width={24}
            src={ReactImage}
            alt=""
            className="svg_logo"
          />
        </a>

        <a href="https://www.typescriptlang.org/" target="_blank">
          <img
            height={24}
            width={24}
            src={TSImage}
            alt=""
            className="svg_logo"
          />
        </a>

        <a href="https://chakra-ui.com/" target="_blank">
          <img
            height={24}
            width={24}
            src={ChakraImage}
            alt=""
            className="svg_logo"
          />
        </a>

        <a
          href="https://www.npmjs.com/package/react-p5-wrapper"
          target="_blank"
        >
          <img
            height={24}
            width={40}
            src={P5Image}
            alt=""
            className="svg_logo"
          />
        </a>
      </Flex>
      <Text color="gray.400">
        © 2022{" "}
        <Link href="https://github.com/Alschn" isExternal color="blue.200">
          Adam Lisichin
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
