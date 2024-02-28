export default async function resetPassword(
  token: string,
  newPassword: string
) {
  if (!token) return null;
  const res = await fetch(`/api/auth/reset/${token}`, {
    method: "POST",
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
