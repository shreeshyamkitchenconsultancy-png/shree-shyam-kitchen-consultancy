export function BlogSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 prose prose-lg max-w-none">
      <h2>{title}</h2>
      {children}
    </section>
  );
}