export function BlogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="my-10">
      <img
        src={src}
        alt={alt}
        className="w-full h-[350px] object-cover rounded-xl"
      />
    </div>
  );
}