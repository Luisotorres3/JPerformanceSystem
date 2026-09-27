import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import BrandLogo from "@/components/BrandLogo";
import { CONTACT_INFO } from "@/constants/contact";
const links = [
  { to: "/", label: "Inicio" },
  { to: "/planes", label: "Planes" },
  { to: "/clientes", label: "Clientes" },
  { to: "/retos", label: "Retos" },
  { to: "/contacto", label: "Contacto" },
];
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return (
    <>
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          const target =
            document.getElementById("main-content") ?? document.querySelector("main, section");
          if (target instanceof HTMLElement) {
            e.preventDefault();
            target.tabIndex = -1;
            target.focus();
            target.scrollIntoView();
          }
        }}
      >
        Saltar al contenido
      </a>
      <header
        className="site-header header-solid"
      >
        <nav className="v2-container nav-layout" aria-label="Navegación principal">
          <Link to="/" className="brand" aria-label="J Performance System — Inicio">
            <BrandLogo variant="white" decorative />
            <span>
              J PERFORMANCE<small>SYSTEM</small>
            </span>
          </Link>
          <div className="desktop-nav">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === "/"}>
                {link.label}
              </NavLink>
            ))}
          </div>
          <Link className="nav-cta" to="/planes">
            Empezar <ArrowUpRight size={17} />
          </Link>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="menu-trigger" aria-label="Abrir menú">
                <Menu size={24} />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-menu">
              <DialogTitle className="mobile-menu-brand">
                <BrandLogo variant="white" decorative />
                <span>
                  J PERFORMANCE<small>EL SIGUIENTE PASO ES TUYO</small>
                </span>
              </DialogTitle>
              <DialogDescription className="sr-only">
                Navega por los planes, clientes, retos y contacto de Juan Pasquau.
              </DialogDescription>
              <div className="mobile-menu-links">
                {links.map((link, i) => (
                  <DialogClose asChild key={link.to}>
                    <NavLink end={link.to === "/"} to={link.to}>
                      <span>0{i + 1}</span>
                      {link.label}
                      <ArrowUpRight />
                    </NavLink>
                  </DialogClose>
                ))}
              </div>
              <DialogClose asChild>
                <Link className="v2-button" to="/planes">
                  Empieza tu cambio <ArrowUpRight size={20} />
                </Link>
              </DialogClose>
              <a
                className="mobile-social"
                href={CONTACT_INFO.social.instagram.url}
                target="_blank"
                rel="noreferrer"
              >
                Instagram / @jperformancesystem
              </a>
            </DialogContent>
          </Dialog>
        </nav>
      </header>
    </>
  );
}
