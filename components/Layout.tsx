export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="text-2xl bg-red-700">Hello</div>
      {children}
    </section>
  );
}
