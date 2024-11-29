export function formatDateInWords(fechaString: string): string {
  const fecha = new Date(fechaString);

  if (isNaN(fecha.getTime())) {
    throw new Error("Fecha inválida");
  }
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();
  const hora = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");
  return `El ${dia} de ${mes} de ${año} a las ${hora}:${minutos}:${segundos}`;
}
