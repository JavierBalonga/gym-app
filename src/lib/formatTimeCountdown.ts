export default function formatTimeCountdown(time: number) {
  const isNegative = time < 0;
  const minutes = Math.floor((Math.abs(time) / (1000 * 60)) % 60);
  const seconds = Math.floor((Math.abs(time) / 1000) % 60);
  const milliseconds = Math.floor((Math.abs(time) / 10) % 100);
  let res = '';
  if (isNegative) {
    res += '-';
  }
  if (minutes) {
    const minutesStr = String(minutes);
    res += `${minutesStr}:`;
  }
  if (minutes || seconds) {
    const secondsStr = minutes ? String(seconds).padStart(2, '0') : String(seconds);
    res += `${secondsStr}.`;
  }
  const millisecondsStr = String(milliseconds).padStart(2, '0');
  res += `${millisecondsStr}`;
  return res;
}
