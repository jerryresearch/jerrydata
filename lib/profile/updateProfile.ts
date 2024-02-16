export default async function updateProfile(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(`/api/auth/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
