export default async function createChat(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(`/api/chat/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
