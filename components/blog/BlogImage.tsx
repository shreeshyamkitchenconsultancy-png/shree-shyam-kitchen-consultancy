import Image from "next/image";

export function BlogImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative my-10 h-[350px] w-full overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 1152px"
        className="object-cover"
      />
    </div>
  );
}
