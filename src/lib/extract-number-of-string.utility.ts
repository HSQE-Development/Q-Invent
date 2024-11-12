export const extractNumberOfString = (text: string): number | null => {
  const numero = text.match(/\d+/);
  return numero ? Number(numero[0]) : null;
};
