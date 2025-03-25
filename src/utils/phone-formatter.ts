export function phoneFormatter(value: string) {
  const number = value.replace(/\D/g, '');

  if (number.length < 4) return number;
  if (number.length < 8) return `${number.slice(0, 3)}-${number.slice(3)}`;
  return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7)}`;
}
