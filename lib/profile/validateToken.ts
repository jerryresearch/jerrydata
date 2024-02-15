export default async function validateToken(token: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/reset/${token}`
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
