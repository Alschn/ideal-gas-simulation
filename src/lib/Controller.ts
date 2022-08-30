import Particle from "./Particle";
import { getRandInt, hexToRgb } from "./utils";

class ParticlesController {
  width: number;
  height: number;
  time_step: number;
  particles: Array<Particle>;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.time_step = 1;
    this.particles = [];
  }

  updateParticles(): void {
    for (let i = 0; i < this.particles.length; i++) {
      let particle = this.particles[i];

      // slightly unoptimal check for collision
      for (let j = i + 1; j < this.particles.length; j++) {
        let otherParticle = this.particles[j];
        if (particle.collidesWith(otherParticle)) {
          const newVel = particle.calculateCollision(otherParticle);
          const newOtherVel = otherParticle.calculateCollision(particle);
          particle.vel = newVel;
          otherParticle.vel = newOtherVel;
        }
      }

      this.checkWallCollision(particle);
      particle.updatePosition(this.time_step);
    }
  }

  checkWallCollision(particle: Particle): boolean {
    const { pos, vel, radius } = particle;

    const touchedTopWall = pos.y <= radius && vel.y < 0;
    const touchedBottomWall = this.height - pos.y <= radius && vel.y > 0;

    const touchedLeftWall = pos.x <= radius && vel.x < 0;
    const touchedRightWall = this.width - pos.x <= radius && vel.x > 0;

    if (touchedTopWall || touchedBottomWall) {
      particle.reverseYVelocity();
      return true;
    } else if (touchedLeftWall || touchedRightWall) {
      particle.reverseXVelocity();
      return true;
    }

    return false;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  addParticle(particle: Particle): void {
    this.particles.push(particle);
  }

  adjustTimestep(factor: number): void {
    this.time_step *= factor;
    if (this.time_step < 0) {
      this.time_step = 0;
    }
  }

  adjustParticlesCount(targetCount: number, ...args: any): void {
    if (targetCount > this.particles.length) {
      // generate new particles
      while (this.particles.length <= targetCount) {
        this.addParticle(
          Particle.create(
            getRandInt(0, this.width),
            getRandInt(0, this.height),
            // @ts-ignore
            ...args
          )
        );
      }
    } else if (targetCount < this.particles.length) {
      // remove existing particles
      while (this.particles.length > targetCount) {
        this.particles.pop();
      }
    }
  }

  adjustVelocities(temperature: number): void {
    for (const particle of this.particles) {
      particle.temperature = temperature;
      particle.updateVelocity();
    }
  }

  adjustMasses(mass: number): void {
    for (const particle of this.particles) {
      particle.mass = mass;
      particle.updateVelocity();
    }
  }

  adjustColors(color: string): void {
    const [r, g, b] = hexToRgb(color);
    for (const particle of this.particles) {
      particle.color = { r, g, b };
    }
  }

  adjustBoundaries(width: number, height: number): void {
    this.setWidth(width);
    this.setHeight(height);
    for (const particle of this.particles) {
      const { x, y } = particle.pos;
      if (x > this.width) {
        particle.pos.x = this.width - 1;
      }
      if (y > this.height) {
        particle.pos.y = this.height - 1;
      }
    }
  }
}

export default ParticlesController;
