export default async function getChat(userId: string, chatId: string) {
  if (!userId || !chatId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${userId}/${chatId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    console.log("error");
    // throw new Error("Error getting chart data");
  }
  return res.json();
}
