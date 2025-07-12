import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plane, Shield, Clock, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920"
            alt="Private Jet"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Fly in Luxury
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
            Experience premium private jet travel with unmatched comfort,
            flexibility, and service
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Button asChild size="lg" className="text-lg">
              <Link href="/jets">Browse Jets</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg bg-white/10 backdrop-blur"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose LuxJet
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Plane className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Premium Fleet</h3>
              <p className="text-gray-600">
                Access to the finest private jets, from light jets to
                ultra-long-range aircraft
              </p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Safety First</h3>
              <p className="text-gray-600">
                Highest safety standards with experienced pilots and
                well-maintained aircraft
              </p>
            </div>
            <div className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p className="text-gray-600">
                Book your flight anytime, anywhere with our round-the-clock
                service
              </p>
            </div>
            <div className="text-center p-6">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">
                Personalized Service
              </h3>
              <p className="text-gray-600">
                Tailored experiences to meet your specific travel needs and
                preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Jets Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popular Aircraft
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {popularJets.map((jet) => (
              <div
                key={jet.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64">
                  <Image
                    src={jet.image}
                    alt={jet.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{jet.name}</h3>
                  <p className="text-gray-600 mb-4">{jet.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">
                      ${jet.price}/hr
                    </span>
                    <Button asChild>
                      <Link href={`/jets/${jet.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/jets">View All Aircraft</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Fly?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who choose LuxJet for their
            private aviation needs
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/register">Create Account</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">LuxJet</h3>
              <p className="text-sm">
                Premium private jet rentals for discerning travelers worldwide
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/jets" className="hover:text-white">
                    Browse Jets
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: info@luxjet.com</li>
                <li>Phone: 1-800-LUXJET1</li>
                <li>24/7 Support Available</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 LuxJet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const popularJets = [
  {
    id: "cessna-citation-cj3",
    name: "Cessna Citation CJ3+",
    description:
      "Perfect for short to medium-range flights with comfort for up to 9 passengers",
    price: "2,500",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
  },
  {
    id: "gulfstream-g280",
    name: "Gulfstream G280",
    description:
      "Superior performance with transcontinental range and luxury amenities",
    price: "4,500",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
  },
  {
    id: "bombardier-global-6000",
    name: "Global 6000",
    description:
      "Ultimate luxury with intercontinental range and three living spaces",
    price: "8,500",
    image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800",
  },
];
