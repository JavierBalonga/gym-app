export default function minmax(min: number, value: number, max: number) {
  return Math.min(Math.max(min, value), max);
}
