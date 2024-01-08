const timeFormater = new Intl.DateTimeFormat('es-ES', {
  minute: 'numeric',
  second: '2-digit',
});

export default function formatTime(milliseconds: number) {
  return timeFormater.format(new Date(milliseconds));
}
