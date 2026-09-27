import { Link } from "react-router-dom";
import { ArrowDown, ArrowUpRight, Instagram, Plus, Check, Handshake } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { collaborations } from "@/data/collaborations";
import BrandLogo from "@/components/BrandLogo";
import runningPhoto from "@/assets/plans/running-personal.webp";
import area15Logo from "@/assets/area15.png";

export default function Collaborations() {
  const jf = collaborations[0];

  return (
    <>
      <Navigation />
      <main id="main-content" className="collaborations-page">
        <section className="inner-page v2-container" aria-labelledby="collaborations-title">
          <div className="inner-page-title collaboration-heading">
            <div>
              <h1 id="collaborations-title">Colaboraciones</h1>
              <p>Profesionales y marcas que suman a tu entrenamiento.</p>
            </div>
            <a href="#colaborar-con-jps" className="text-button collaboration-jump">
              Colabora con JPS <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="collaboration-list">
            <article className="collaboration-item">
              <div className="collaboration-brand">
                <span className="collaboration-index" aria-hidden="true">
                  01 / EQUIPO
                </span>
                <BrandLogo variant="dark" className="collaboration-jps" />
                <Plus size={22} className="collaboration-plus" aria-hidden="true" />
                <div className="jf-logo-crop">
                  <img src={jf.logo} alt="JF Nutrición" />
                </div>
                <span>Entrenamiento + nutrición</span>
              </div>
              <div className="collaboration-details">
                <p className="eyebrow">PROFESIONALES QUE SUMAN</p>
                <h2>JF Nutrición</h2>
                <p>{jf.description}</p>
                <ul className="collaboration-benefits">
                  <li>
                    <Check size={17} aria-hidden="true" /> Plan alimenticio personalizado
                  </li>
                  <li>
                    <Check size={17} aria-hidden="true" /> Seguimiento y ajustes coordinados
                  </li>
                </ul>
                <div className="collaboration-actions">
                  <Link to="/planes?tipo=conjunto" className="v2-button">
                    Ver packs conjuntos <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  <a
                    href={jf.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-button"
                  >
                    <Instagram size={18} aria-hidden="true" /> {jf.handle}
                  </a>
                </div>
              </div>
            </article>
            <article className="collaboration-item">
              <div className="collaboration-brand collaboration-brand-agency">
                <span className="collaboration-index" aria-hidden="true">
                  02 / FÚTBOL
                </span>
                <img
                  className="collaboration-agency-logo"
                  src={area15Logo}
                  alt="Logo de Área15 Next Step"
                  loading="lazy"
                  width="1254"
                  height="1254"
                />
                <span>Área15 Next Step</span>
              </div>
              <div className="collaboration-details">
                <p className="eyebrow">FORMACIÓN Y DESARROLLO DE FUTBOLISTAS</p>
                <h2>Área15 Next Step</h2>
                <p>Entrenador personal de los futbolistas que forman parte de la agencia Área15</p>
                <div className="collaboration-actions">
                  <a
                    href="https://area15nextstep.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v2-button"
                  >
                    Conoce Área15 <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section
          id="colaborar-con-jps"
          className="collaboration-invitation"
          aria-labelledby="collaborate-title"
        >
          <img
            className="collaboration-invitation-photo"
            src={runningPhoto}
            alt=""
            loading="lazy"
            width="1254"
            height="1254"
          />
          <div className="v2-container collaboration-invitation-content">
            <p className="eyebrow">
              <Handshake size={20} aria-hidden="true" /> COLABORA CON JPS
            </p>
            <h2 id="collaborate-title">
              Tu marca.
              <br />
              <span>Nuestro próximo paso.</span>
            </h2>
            <p>
              ¿Tienes una propuesta que aporte al deporte? Buscamos profesionales y marcas con
              quienes construir algo que merezca la pena.
            </p>
            <ul className="collaboration-audience" aria-label="Tipos de colaboración">
              <li>Marcas deportivas</li>
              <li>Profesionales</li>
              <li>Eventos y proyectos</li>
            </ul>
            <Link to="/contacto?colaboracion=marca" className="v2-button button-gold">
              Quiero colaborar con JPS <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            <p className="collaboration-invitation-note">Cuéntale tu idea directamente a Juan.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
