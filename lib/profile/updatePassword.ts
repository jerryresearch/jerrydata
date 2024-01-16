export default async function updatePassword(userId: string, data: any) {
  if (!userId) return null;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/password/${userId}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    console.log("error");
    throw new Error();
  }
  return res.json();
}
