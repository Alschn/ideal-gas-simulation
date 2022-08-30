import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, IconButton, Tooltip, useColorMode } from "@chakra-ui/react";

const ColorMode: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box position="absolute" left={0} top={0} m={1}>
      <Tooltip label={colorMode === "light" ? "Tryb ciemny" : "Tryb jasny"}>
        <IconButton
          onClick={toggleColorMode}
          background="inherit"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle dark/light mode"
        />
      </Tooltip>
    </Box>
  );
};

export default ColorMode;
