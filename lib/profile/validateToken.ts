export default async function validateToken(token: string) {
  const res = await fetch(`/api/auth/reset/${token}`);
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
