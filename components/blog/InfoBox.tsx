export function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 p-6 border rounded-xl bg-muted/20">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}