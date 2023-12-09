const dateFormater = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

export default function formatDatetime(date: Date | string) {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return dateFormater.format(date);
}
