export default async function resetPassword(
  token: string,
  newPassword: string
) {
  if (!token) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset/${token}`,
    {
      method: "POST",
      body: JSON.stringify({ newPassword }),
    }
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
