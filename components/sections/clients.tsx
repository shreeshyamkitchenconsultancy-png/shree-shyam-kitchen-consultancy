import Image from "next/image";

const logos = [
  {
    name: "The Bamboo Nation",
    image: "/images/logos/tbnlogo.png",
  },

  {
    name: "SKY Kitchen",
    image: "/images/logos/skykitchenlogo.jpg",
  },

  {
    name: "The Lari Restaurant",
    image: "/images/logos/larilogo.png",
  },

  {
    name: "Cafe Light",
    image: "/images/logos/cafelightlogo.png",
  },

  {
    name: "Pizza Fresca",
    image: "/images/logos/pizzafrescalogo.png",
  },

  {
    name: "Snack Chat Cafe",
    image: "/images/logos/Snackchatlogo.png",
  },

];

const partners = [
  {
    name: "Achal Industries",
    image: "/images/logos/achallogo.png",
  },

  {
    name: "Veeba",
    image: "/images/logos/vrblogo.png",
  },

  {
    name: "Monin",
    image: "/images/logos/moninlogo.png",
  },

  {
    name: "Tasty Pixel",
    image: "/images/logos/tastypixel.png",
  },

  {
    name: "Vashu Design Studio",
    image: "/images/logos/vashudesignstudiologo.png",
  },

  {
    name: "Barisco",
    image: "/images/logos/bariscologo.png",
  },

  {
    name: "Garvita Agencies",
    image: "/images/logos/garvitalogo.png",
  },

  {
    name: "Sada Sudh Ventures",
    image: "/images/logos/sadasudhventureslogo.png",
  },

  {
    name: "Jubilant Consumer",
    image: "/images/logos/jubilantlogo.png",
  },
];

export function Clients() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Our Clients & Partners
          </span>
          <h2 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
            Trusted By Hospitality Brands & Industry Partners
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We have  had the privilege of working with amazing hospitality brands and industry partners across India.
          </p>
        </div>

        {/* Logo Marquee */}
        <div className="relative mb-12 overflow-hidden">
          {/* Gradient masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-muted/30 to-transparent" />

          {/* Scrolling logos */}
          <div className="flex animate-marquee space-x-12">
            {[...logos, ...logos].map((logo, index) => (
             <div
  key={`${logo.name}-${index}`}
  className="flex flex-col items-center justify-center min-w-[140px] gap-3"
>
  <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-3 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
    <Image
      src={logo.image}
      alt={logo.name}
      fill
      sizes="96px"
      className="object-contain"
    />
  </div>

  <span className="text-center text-sm font-medium text-foreground/70">
    {logo.name}
  </span>
</div>
            ))}
          </div>
        </div>

        {/* Partners Grid */}
<div
  className="mt-16"
>
  <h3 className="mb-10 text-center font-serif text-2xl font-bold text-foreground">
    Trusted Vendor & Brand Partners
  </h3>

  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
    {partners.map((partner) => (
      <div
        key={partner.name}
        className="group flex flex-col items-center justify-center"
      >
        <div className="relative flex h-20 w-full items-center justify-center transition-all duration-300 hover:scale-105">
          <Image
            src={partner.image}
            alt={partner.name}
            fill
            sizes="120px"
            className="object-contain"
          />
        </div>

        <span className="mt-3 text-center text-sm font-medium text-muted-foreground">
          {partner.name}
        </span>
      </div>
    ))}
  </div>
</div>
      </div>
    </section>
  );
}
