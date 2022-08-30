import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import ColorMode from "./components/ColorMode";
import Footer from "./components/Footer";
import GitHubCorner from "./components/GithubCorner";
import sketch from "./lib/sketch";
import {
  calculateAverageSpeed,
  calculateAverageVelocity,
  calculateKineticEnergy,
  calculatePeakSpeed,
  UNIT,
} from "./lib/utils";
// @ts-ignore - react-katex does not provide type annotations
import { InlineMath } from "react-katex";

const App: React.FC = () => {
  const [canvasWidth, setCanvasWidth] = useState(800);
  const [canvasHeight, setCanvasHeight] = useState(800);

  const [particlesCount, setParticlesCount] = useState<number>(200);
  const [mass, setMass] = useState<number>(16 * UNIT);
  const [temperature, setTemperature] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#73c875");
  const [simulationSpeed, setSimulationSpeed] = useState<number>(0.01);

  const pause = (): void => setIsPaused(!isPaused);

  const reset = (): void => {
    setParticlesCount(200);
    setMass(16 * UNIT);
    setTemperature(100);
    setIsPaused(false);
    setColor("#73c875");
    setSimulationSpeed(0.01);
    setCanvasHeight(800);
    setCanvasWidth(800);
  };

  const handleCanvasWidthChange = (value: string): void => {
    const parsed = parseInt(value, 10);
    if (!parsed) return;
    setCanvasWidth(parsed);
  };

  const handleCanvasHeightChange = (value: string): void => {
    const parsed = parseInt(value, 10);
    if (!parsed) return;
    setCanvasHeight(parsed);
  };

  const averageEnergy = useMemo(() => {
    return calculateKineticEnergy(temperature);
  }, [temperature]);

  const averageVelocity = useMemo(() => {
    return calculateAverageVelocity(temperature, mass);
  }, [temperature, mass]);

  const peakSpeed = useMemo(() => {
    return calculatePeakSpeed(temperature, mass);
  }, [temperature, mass]);

  const averageSpeed = useMemo(() => {
    return calculateAverageSpeed(temperature, mass);
  }, [temperature, mass]);

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      minH="100vh"
    >
      <GitHubCorner url="https://github.com/Alschn" />
      <ColorMode />

      <Heading mt={{ base: 10, md: 4 }} mb={{ base: 4, md: 12 }}>
        Model gazu doskonałego 2D
      </Heading>

      <Grid templateColumns={{ base: "1fr", xl: "1.5fr 1fr 1fr" }} gridGap={8}>
        <Flex direction="column" justify="center" align="center" mb={6}>
          <ReactP5Wrapper
            sketch={sketch}
            particles={particlesCount}
            isPaused={isPaused}
            simulationSpeed={simulationSpeed}
            temperature={temperature}
            mass={mass}
            color={color}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
          />

          <ButtonGroup spacing={4} my={4}>
            <Button onClick={pause} colorScheme="blue">
              {isPaused ? "Wznów" : "Pauza"}
            </Button>
            <Button onClick={reset} colorScheme="red">
              {"Reset"}
            </Button>
          </ButtonGroup>
        </Flex>

        <Flex
          mb={8}
          flexDirection="column"
          justify="center"
          mx={{ base: 20, md: 2 }}
        >
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="700">
              Ustawienia:
            </Text>
          </Box>

          <Box mb={4}>
            <Text fontWeight="600" mb={2}>
              Wymiary canvasu:{" "}
            </Text>

            <SimpleGrid columns={2}>
              <Box>
                <NumberInput
                  mx={1}
                  min={200}
                  max={1000}
                  value={canvasWidth}
                  onChange={handleCanvasWidthChange}
                  mb={1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text color="gray.400">(Min. 200px, Max. 1000px)</Text>
              </Box>

              <Box>
                <NumberInput
                  mx={1}
                  min={200}
                  max={1000}
                  value={canvasHeight}
                  onChange={handleCanvasHeightChange}
                  mb={1}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text color="gray.400">(Min. 200px, Max. 1000px)</Text>
              </Box>
            </SimpleGrid>
          </Box>

          <Box mb={4}>
            <Text fontWeight="600">Liczba cząsteczek: {particlesCount}</Text>
            <Slider
              aria-label="slider-particles"
              value={particlesCount}
              onChange={(value) => setParticlesCount(value)}
              name="particles_count"
              min={1}
              max={1000}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Box mb={4}>
            <Text fontWeight="600">Masa cząsteczki: {mass} kg</Text>
            <Slider
              aria-label="slider-temperature"
              value={mass}
              onChange={(value) => setMass(value)}
              name="temperature"
              step={UNIT}
              min={UNIT}
              max={512 * UNIT}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Box mb={4}>
            <Text fontWeight="600">Temperatura gazu: {temperature} K</Text>
            <Slider
              aria-label="slider-temperature"
              value={temperature}
              onChange={(value) => setTemperature(value)}
              name="temperature"
              min={1}
              max={500}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Box mb={4}>
            <Text fontWeight="600">
              Prędkość symulacji: {Math.floor(simulationSpeed * 100)} %
            </Text>
            <Slider
              aria-label="slider-simulation-speed"
              value={simulationSpeed}
              onChange={(value) => setSimulationSpeed(value)}
              name="simulation_speed"
              step={0.01}
              min={0}
              max={2}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Flex mb={4} alignItems="center">
            <Text fontWeight="600" display="flex" flexGrow={1}>
              Kolor cząsteczek:
            </Text>
            <Input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              maxWidth="60%"
            />
          </Flex>
        </Flex>

        <Flex
          mb={8}
          flexDirection="column"
          justify="center"
          mx={{ base: 20, md: 2 }}
        >
          <Box mb={4}>
            <Text fontSize="2xl" fontWeight="700">
              Statystyki:
            </Text>
          </Box>

          <Box mb={4}>
            <Text fontWeight="600" mb={1}>
              Średnia energia kinetyczna cząsteczki:{" "}
              {averageEnergy.toPrecision(3)} J
            </Text>
            <InlineMath math="\stackrel{-}{E_k} = \frac{3}{2} \cdot k_B \cdot T" />
          </Box>

          <Box mb={4}>
            <Text fontWeight="600" mb={1}>
              Średnia prędkość kwadratowa cząsteczki:{" "}
              {averageVelocity.toPrecision(3)} m/s
            </Text>
            <InlineMath math="v_k = \sqrt{\frac{3 \cdot k_B \cdot T}{m}}" />
          </Box>

          <Box mb={4}>
            <Text fontWeight="600" mb={1}>
              Średnia prędkość cząsteczki: {averageSpeed.toPrecision(3)} m/s
            </Text>
            <InlineMath math="\stackrel{-}{v} = \sqrt{\frac{8 \cdot k_B \cdot T}{\pi \cdot m}}" />
          </Box>

          <Box mb={4}>
            <Text fontWeight="600" mb={1}>
              Najbardziej prawdopodobna prędkość cząsteczki:{" "}
              {peakSpeed.toPrecision(3)} m/s
            </Text>
            <InlineMath math="v_p = \sqrt{\frac{2 \cdot k_B \cdot T}{m}}" />
          </Box>
        </Flex>
      </Grid>

      <Footer />
    </Flex>
  );
};

export default App;
