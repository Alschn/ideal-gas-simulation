import ParticlesController from "../lib/Controller";
import Particle from "../lib/Particle";
import { P5Instance, SketchProps } from "react-p5-wrapper";
import { getRandInt, UNIT } from "../lib/utils";

interface SketchComponentProps {
  canvasWidth: number;
  canvasHeight: number;
  particles: number;
  isPaused: boolean;
  simulationSpeed: number;
  temperature: number;
  mass: number;
  color: string;
}

type P5InstanceProps = SketchProps & Partial<SketchComponentProps>;

const sketch = (p5: P5Instance<P5InstanceProps>) => {
  const background = 250;
  const radius = 5;

  let canvasWidth = 800;
  let canvasHeight = 800;
  let particles = 50;
  let temperature = 100;
  let isPaused = false;
  let mass = 16 * UNIT;
  let color = "#73c875";

  const controller: ParticlesController = new ParticlesController(
    canvasWidth,
    canvasHeight
  );

  p5.setup = () => {
    p5.createCanvas(canvasWidth, canvasHeight);

    for (let i = 0; i < particles; i++) {
      const p = Particle.create(
        getRandInt(0, canvasWidth),
        getRandInt(0, canvasHeight),
        radius,
        mass,
        temperature,
        color
      );
      controller.addParticle(p);
    }
  };

  p5.updateWithProps = (props) => {
    if (props.canvasHeight !== undefined && props.canvasWidth !== undefined) {
      if (
        props.canvasHeight < 200 ||
        props.canvasHeight > 1000 ||
        props.canvasWidth < 200 ||
        props.canvasWidth > 1000
      ) {
        return;
      }
      p5.resizeCanvas(props.canvasWidth, props.canvasHeight);
      controller.adjustBoundaries(props.canvasWidth, props.canvasHeight);
    }

    if (props.mass !== undefined && props.mass !== mass) {
      mass = props.mass;
      controller.adjustMasses(mass);
    }

    if (props.temperature !== undefined && props.temperature !== temperature) {
      temperature = props.temperature;
      controller.adjustVelocities(temperature);
    }

    if (props.isPaused !== undefined) {
      isPaused = props.isPaused;
    }

    if (props.particles && particles !== props.particles) {
      particles = props.particles;
      controller.adjustParticlesCount(
        props.particles,
        radius,
        mass,
        temperature,
        color
      );
    }

    if (props.color !== undefined && props.color !== color) {
      color = props.color;
      controller.adjustColors(props.color);
    }

    if (
      props.simulationSpeed !== undefined &&
      props.simulationSpeed !== controller.time_step
    ) {
      controller.time_step = props.simulationSpeed;
    }
  };

  p5.draw = () => {
    p5.background(background);

    if (!isPaused) {
      controller.updateParticles();
    }

    for (const p of controller.particles) {
      p5.fill(p.color.r, p.color.g, p.color.b);
      p5.circle(p.pos.x, p.pos.y, p.radius * 2);
    }
  };
};

export default sketch;
