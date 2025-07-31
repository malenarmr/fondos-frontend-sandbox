// helpers/colors.ts (opcional)
export function getNewsCardColors(bg?: string | null) {
  // Verde principal por defecto
  const safeBg = bg || '#009B67';

  // Limpiamos para comparar (mayúsculas y sin espacios)
  const color = safeBg.replace(/\s+/g, '').toUpperCase();

  let textColor = '#3C3C3B'; // negro por default

  if (color === '#009B67' || color === '#2098A1') {
    textColor = '#FFFFFF';
  } else if (
    color === '#E3E3E3' ||
    color === '#EBEBEB' ||
    color === '#F5F5F5'
  ) {
    textColor = '#3C3C3B';
  }

  return { bgColor: safeBg, textColor };
}
