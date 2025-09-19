export const formatDate = (str: string): string => {
  const date = new Date(str);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Paris'
  });
};

export const formatText = (str: string): string => {
  // Remove accents and convert to lowercase
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}