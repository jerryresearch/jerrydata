export default async function requestPasswordChange(email: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/password/`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
    }
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
