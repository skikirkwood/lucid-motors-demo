import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Image src="/onstar-logo.svg" alt="OnStar" width={48} height={48} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/plans-pricing" className="hover:text-white transition-colors">Plans & Pricing</Link></li>
              <li><Link href="/safety-security" className="hover:text-white transition-colors">Safety & Security</Link></li>
              <li><Link href="/navigation" className="hover:text-white transition-colors">Navigation</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Technology
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/super-cruise" className="hover:text-white transition-colors">Super Cruise</Link></li>
              <li><Link href="/connected-services" className="hover:text-white transition-colors">Connected Services</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About OnStar</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs">
          <p>© {new Date().getFullYear()} OnStar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
