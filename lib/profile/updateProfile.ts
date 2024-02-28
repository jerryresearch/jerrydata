export default async function updateProfile(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(`/api/auth/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
