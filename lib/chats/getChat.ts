export default async function getChat(userId: string, chatId: string) {
  if (!userId || !chatId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${userId}/${chatId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
