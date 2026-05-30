export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mt-4">
      {items.map((item, i) => (
        <li key={i}>✓ {item}</li>
      ))}
    </ul>
  );
}