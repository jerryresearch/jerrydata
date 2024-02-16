export default async function createChat(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(`/api/chat/${userId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
