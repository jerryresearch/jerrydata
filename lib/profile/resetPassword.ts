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
    console.log("error");
    throw new Error();
  }
  return res.json();
}
