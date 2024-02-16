export default async function sendMessage(
  userId: string,
  chatId: string,
  data: any
) {
  if (!userId || !chatId) return null;
  const res = await fetch(`/api/chat/${userId}/${chatId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
