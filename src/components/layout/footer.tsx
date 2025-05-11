// src/components/layout/footer.tsx
import Link from "next/link";
import { Brain } from "lucide-react";
import { SITE_NAME, FOOTER_NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {/* Site Info */}
          <div className="md:col-span-1 lg:col-span-2 xl:col-span-2"> {/* Adjusted col-span for lg and xl */} 
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">{SITE_NAME}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering businesses with cutting-edge AI solutions and expert integration services.
            </p>
          </div>

          {/* Company Links */}
          {FOOTER_NAV_LINKS.company && FOOTER_NAV_LINKS.company.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-2">
                {FOOTER_NAV_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href!} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Links */}
          {FOOTER_NAV_LINKS.legal && FOOTER_NAV_LINKS.legal.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                {FOOTER_NAV_LINKS.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href!} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Services Links - Rendered only if FOOTER_NAV_LINKS.services exists and is not empty */}
          {FOOTER_NAV_LINKS.services && FOOTER_NAV_LINKS.services.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Services</h3>
              <ul className="space-y-2">
                {FOOTER_NAV_LINKS.services.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href!} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Media Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-4">Connect</h3>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
