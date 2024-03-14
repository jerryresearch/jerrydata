export default async function getQuery(
  userId: string,
  chatId: string,
  data: any
) {
  if (!userId || !chatId) return null;
  const res = await fetch(`/api/chat/${userId}/${chatId}/query`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
