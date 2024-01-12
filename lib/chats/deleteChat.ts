export default async function deleteChat(userId: string, chatId: string) {
  if (!userId || !chatId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${userId}/${chatId}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    console.log("error");
    throw new Error("Error deleting chart data");
  }
  return res.json();
}
