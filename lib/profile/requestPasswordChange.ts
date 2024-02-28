export default async function requestPasswordChange(email: string) {
  const res = await fetch(`/api/auth/password/`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message);
  }
  return res.json();
}
