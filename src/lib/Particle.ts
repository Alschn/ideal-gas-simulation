import { ColorRGB, Vector2D } from "./types";
import { calculateAverageVelocity, getRandInt, hexToRgb } from "./utils";

class Particle {
  pos: Vector2D;
  vel!: Vector2D;
  radius: number;
  mass: number;
  temperature: number;
  color: ColorRGB;

  constructor(
    x: number,
    y: number,
    radius: number,
    mass: number,
    temperature: number = 250,
    color: ColorRGB = { r: 0, g: 0, b: 0 }
  ) {
    this.pos = { x, y };
    this.temperature = temperature;
    this.radius = radius;
    this.mass = mass;
    this.color = color;
    this.updateVelocity();
  }

  reverseXVelocity(): void {
    this.vel.x = -this.vel.x;
  }

  reverseYVelocity(): void {
    this.vel.y = -this.vel.y;
  }

  collidesWith(otherParticle: Particle): boolean {
    const { pos, vel, radius } = otherParticle;
    const d_X = this.pos.x - pos.x;
    const d_Y = this.pos.y - pos.y;

    const d_velX = this.vel.x - vel.x;
    const d_velY = this.vel.y - vel.y;

    const distance = Math.sqrt(d_X * d_X + d_Y * d_Y);

    // If particles are not in range, they are not colliding
    if (distance > this.radius + radius) return false;

    // Check if particles are moving towards each other
    const dotProduct = d_velX * d_X + d_velY * d_Y;
    const areMovingTowards = dotProduct < 0;
    return areMovingTowards;
  }

  calculateCollision(otherParticle: Particle): Vector2D {
    const { pos, vel, mass } = otherParticle;
    const d_X = this.pos.x - pos.x;
    const d_Y = this.pos.y - pos.y;

    const d_velX = this.vel.x - vel.x;
    const d_velY = this.vel.y - vel.y;

    const dotProduct = d_X * d_velX + d_Y * d_velY;
    const lengthDiff = Math.sqrt(d_X * d_X + d_Y * d_Y);
    const l = lengthDiff * lengthDiff;

    const massTerm = (2 * mass) / (this.mass + mass);
    const rightSideScalar = massTerm * (dotProduct / l);
    const rightSide = { x: d_X * rightSideScalar, y: d_Y * rightSideScalar };

    const newVelocity = {
      x: this.vel.x - rightSide.x,
      y: this.vel.y - rightSide.y,
    };
    return newVelocity;
  }

  updatePosition(time_step: number): void {
    this.pos.x += this.vel.x * time_step;
    this.pos.y += this.vel.y * time_step;
  }

  updateVelocity(): void {
    const avgVelocity = this.getAverageVelocity();
    this.vel = {
      x: avgVelocity * getRandInt(-1, 1),
      y: avgVelocity * getRandInt(-1, 1),
    };
  }

  getAverageVelocity(): number {
    return calculateAverageVelocity(this.temperature, this.mass);
  }

  static create(
    x: number,
    y: number,
    radius: number,
    mass: number,
    temperature: number,
    color: string
  ): Particle {
    let p = new Particle(x, y, radius, mass, temperature);
    const [r, g, b] = hexToRgb(color);
    p.color = { r, g, b };
    return p;
  }
}

export default Particle;
