export default async function removeImage(userId: string) {
  if (!userId) return null;
  const res = await fetch(`/api/auth/user/${userId}`, { method: "DELETE" });
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
