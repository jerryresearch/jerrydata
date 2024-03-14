export default async function getDescription(
  userId: string,
  chatId: string,
  data: any
) {
  if (!userId || !chatId) return null;
  const res = await fetch(`/api/chat/${userId}/${chatId}/description`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
