// "2026-03-23T10:56:25.148+00:00" -> "d. 23/3"
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `d. ${date.getDate()}/${date.getMonth() + 1}`;
}
