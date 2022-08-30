export const BOLTZMANN_CONSTANT = 1.38064852e-23;
export const UNIT = 1.66e-27;

export const getRandInt = (min: number, max: number): number => {
  return (max - min) * Math.random() + min;
};

export const calculateKineticEnergy = (temperature: number): number => {
  return 3 * 0.5 * BOLTZMANN_CONSTANT * temperature;
};

export const calculateAverageVelocity = (
  temperature: number,
  mass: number
): number => {
  return Math.sqrt((3 * BOLTZMANN_CONSTANT * temperature) / mass);
};

export const calculatePeakSpeed = (temperature: number, mass: number) => {
  return Math.sqrt((2 * BOLTZMANN_CONSTANT * temperature) / mass);
};

export const calculateAverageSpeed = (temperature: number, mass: number) => {
  return Math.sqrt((8 * BOLTZMANN_CONSTANT * temperature) / (Math.PI * mass));
};

export const hexToRgb = (hex: string) => {
  return hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )!
    .substring(1)!
    .match(/.{2}/g)!
    .map((x) => parseInt(x, 16));
};
