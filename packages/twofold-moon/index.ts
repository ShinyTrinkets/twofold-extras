import moonmoji from 'moonmoji';

export function moon(d, { date = null, emoji = true }) {
  /**
   * Return the moon phase for current date,
   * or for a specified date.
   */
  if (!(d || date)) return;

  date = getDate(date || d);

  const m = moonmoji(date);
  if (emoji === 'false' || emoji === 'no') {
    return m.name;
  }

  return m.emoji;
}

function getDate(text: string | Date): Date {
  if (text && typeof text === 'string') {
    return new Date(text);
  } else if (!text || typeof text !== 'object') {
    return new Date();
  }
  return text;
}
