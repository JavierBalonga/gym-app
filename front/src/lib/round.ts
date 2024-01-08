export default function round(value: number, precision = 1) {
  if (precision > 1 || precision <= 0) throw new Error('Precision must be between 0 and 1');
  return Math.round(value / precision) * precision;
}
