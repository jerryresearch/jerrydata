export default async function deleteChat(userId: string, chatId: string) {
  if (!userId || !chatId) return null;
  const res = await fetch(`/api/chat/${userId}/${chatId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    console.log("error");
    throw new Error("Error deleting chart data");
  }
  return res.json();
}
