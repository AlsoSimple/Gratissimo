
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `d. ${date.getDate()}/${date.getMonth() + 1}`;
}


export function formatDateWithYear(dateString: string): string {
  const date = new Date(dateString);
  const year = String(date.getFullYear()).slice(2);
  return `d. ${date.getDate()}/${date.getMonth() + 1}-${year}`;
}
