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
    console.log("error");
    throw new Error("Error updating chat data");
  }
  return res.json();
}
