import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import clients from "@/data/clients";
import Reveal from "./Reveal";
import AthleteMedia from "./AthleteMedia";
export default function ResultsShowcase() {
  return (
    <section className="results-section section-space" aria-labelledby="results-title">
      <div className="v2-container">
        <Reveal className="section-top">
          <div>
            <p className="eyebrow">03 / CLIENTES CON LOS QUE HE TRABAJADO</p>
            <h2 id="results-title" className="display-heading">
              Se entrena.
              <br />
              <span className="muted-type">Se compite.</span>
            </h2>
          </div>
          <div className="section-aside">
            <p>
              Clientes con los que he trabajado.
              <br />
              Distintos puntos de partida. La misma exigencia.
            </p>
            <Link to="/clientes" className="text-button">
              Ver todos los clientes <ArrowUpRight size={18} />
            </Link>
          </div>
        </Reveal>
        <div className="athlete-track" tabIndex={0} role="region" aria-label="Galería de clientes">
          {clients.slice(0, 4).map((client, i) => (
            <article className="athlete-card" key={client.id}>
              <AthleteMedia client={client} index={i} />
              <div className="athlete-caption">
                <div>
                  <h3>{client.name}</h3>
                </div>
              </div>
              {client.source && (
                <a
                  className="client-source"
                  href={client.source.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Fuente de la foto ↗
                </a>
              )}
            </article>
          ))}
        </div>
        <div className="gallery-bottom">
          <span className="eyebrow">DEL ENTRENAMIENTO AL CAMPO. Y A LA PISTA.</span>
        </div>
      </div>
    </section>
  );
}
