export default async function uploadImage(userId: string, data: FormData) {
  if (!userId) return null;
  const res = await fetch(`/api/auth/user/${userId}`, {
    method: "PATCH",
    body: data,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
