import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-24">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
      <div
          className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      <div
          className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      </div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='m0 40 40-40h-10l-40 40h10zm40 0v-10l-40 40h10l30-30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div
            className="mx-auto max-w-4xl text-center"
          >
          <div>
            <h2 className="mb-6 font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              <span className="text-balance">Start Your Restaurant Success Journey Today</span>
            </h2>
            <p className="mb-10 text-xl text-white/90">
              Book a free consultation with our hospitality experts and take the first step 
              towards building a profitable hospitality business.
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group bg-white px-8 text-primary shadow-xl transition-all hover:bg-white/90 hover:shadow-2xl"
            >
              <Link
                href="https://forms.gle/Zk5pnfChBxQK3YQ58"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-[#25D366] px-8 text-white shadow-xl transition-all hover:bg-[#128C7E] hover:shadow-2xl"
            >
              <Link
                href="https://wa.me/917820942754"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/50 bg-transparent px-8 text-white transition-all hover:bg-white/10"
            >
              <Link href="tel:+917820942754">
                <Phone className="mr-2 h-5 w-5" />
                Call Now
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              Free Initial Consultation
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              No Obligation
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              Expert Guidance
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-white/60" />
              Pan India Service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
