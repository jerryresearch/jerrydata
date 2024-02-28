export default async function removeImage(userId: string) {
  if (!userId) return null;
  const res = await fetch(`/api/auth/user/${userId}`, { method: "DELETE" });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
