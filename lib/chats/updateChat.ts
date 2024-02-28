export default async function updateChat(
  userId: string,
  chatId: string,
  body: any
) {
  if (!userId || !chatId) return null;
  const res = await fetch(`/api/chat/${userId}/${chatId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
