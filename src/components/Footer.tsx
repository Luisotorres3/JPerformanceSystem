import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Instagram, Linkedin, Send } from "lucide-react";
import { SiTiktok, SiWhatsapp } from "react-icons/si";
import BrandLogo from "@/components/BrandLogo";
import { CONTACT_INFO } from "@/constants/contact";
export default function Footer() {
  const isHome = useLocation().pathname === "/";
  const socials = [
    { name: "Instagram", url: CONTACT_INFO.social.instagram.url, Icon: Instagram },
    { name: "WhatsApp", url: CONTACT_INFO.whatsapp.url, Icon: SiWhatsapp },
    { name: "TikTok", url: CONTACT_INFO.social.tiktok.url, Icon: SiTiktok },
    { name: "Telegram", url: CONTACT_INFO.social.telegram.url, Icon: Send },
    { name: "LinkedIn", url: CONTACT_INFO.social.linkedin.url, Icon: Linkedin },
  ];
  return (
    <footer className="site-footer">
      <div className="v2-container">
        <div className="footer-main">
          <div>
            <Link to="/" className="brand">
              <BrandLogo variant={isHome ? "dark" : "white"} decorative />
              <span>
                J PERFORMANCE<small>SYSTEM</small>
              </span>
            </Link>
            <p>
              Entrena con intención.
              <br />
              Progresa con un sistema.
            </p>
            <div className="footer-socials">
              {socials.map(({ name, url, Icon }) => (
                <a key={name} aria-label={name} href={url} target="_blank" rel="noreferrer">
                  <Icon aria-hidden="true" size={19} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">EXPLORA</span>
            <Link to="/planes">Planes de entrenamiento</Link>
            <Link to="/clientes">Clientes</Link>
            <Link to="/retos">Retos</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div className="footer-contact">
            <span className="eyebrow">HABLEMOS DE TU OBJETIVO</span>
            <a href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email} <ArrowUpRight size={17} />
            </a>
            <a href={`tel:${CONTACT_INFO.phone}`}>{CONTACT_INFO.phoneFormatted}</a>
            <p>{CONTACT_INFO.location}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-attribution">
            <span>© {new Date().getFullYear()} J Performance System</span>
            <span className="footer-developer">
              Desarrollada por{" "}
              <a
                href="https://luisotorres3.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio de Luisotorres3 (abre en otra pestaña)"
              >
                Luisotorres3
              </a>
            </span>
          </p>
          <div>
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/condiciones">Condiciones</Link>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/cookies">Cookies</Link>
            <button onClick={() => window.dispatchEvent(new Event("open-cookie-preferences"))}>
              Configurar cookies
            </button>
          </div>
          <span>DISCIPLINA / CIENCIA / PROGRESO</span>
        </div>
      </div>
    </footer>
  );
}
