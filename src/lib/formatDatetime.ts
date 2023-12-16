const dateFormater = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

export default function formatDatetime(date: Date | string | undefined) {
  if (!date) return '-';
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return dateFormater.format(date);
}
