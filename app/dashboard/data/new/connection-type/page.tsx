import ConnectionType from "@/components/ConnectionType";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const id = searchParams?.id || "";
  const type = searchParams?.type || "";

  return <ConnectionType type={type} id={id} />;
};

export default Page;
