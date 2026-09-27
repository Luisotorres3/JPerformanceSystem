import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Dumbbell,
  Plus,
  Target,
  Route,
  BarChart3,
  RefreshCw,
  Flag,
} from "lucide-react";
import { runningChallenges, strengthChallenges } from "@/data/challenges";
import { collaborations } from "@/data/collaborations";
import BrandLogo from "@/components/BrandLogo";
import Reveal from "./Reveal";

const steps = [
  { title: "Te conozco", text: "Tu objetivo, tu nivel y el tiempo que tienes.", icon: Target },
  { title: "Trazamos el plan", text: "Sesiones y progresiones adaptadas a ti.", icon: Route },
  { title: "Entrenas", text: "Indicaciones claras y comunicación directa.", icon: Dumbbell },
  {
    title: "Medimos",
    text: "Cargas, técnica y sensaciones para ver tu evolución.",
    icon: BarChart3,
  },
  { title: "Ajustamos", text: "El plan cambia contigo y con tu progreso.", icon: RefreshCw },
];

export function MethodPreview() {
  return (
    <section className="home-method section-space" aria-labelledby="home-method-title">
      <div className="v2-container">
        <Reveal className="home-preview-heading">
          <div>
            <p className="eyebrow">02 / EL MÉTODO JPS</p>
            <h2 id="home-method-title" className="display-heading">
              Yo te doy las herramientas.
              <br />
              <span>Tú trabajas. Tú progresas.</span>
            </h2>
          </div>
          <p>Cinco pasos. Una dirección: avanzar con sentido.</p>
        </Reveal>
        <ol className="home-method-steps">
          {steps.map(({ title, text, icon: Icon }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.05}>
                <div className="home-step-top">
                  <span>0{i + 1}</span>
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PlansPreview() {
  return (
    <section className="home-plans section-space" aria-labelledby="home-plans-title">
      <div className="v2-container">
        <Reveal className="home-preview-heading">
          <div>
            <p className="eyebrow">04 / ENCUENTRA TU ENFOQUE</p>
            <h2 id="home-plans-title" className="display-heading">
              Un plan que encaje
              <br />
              <span className="muted-type">contigo.</span>
            </h2>
          </div>
          <p>
            Fuerza, rendimiento, oposiciones o volver a entrenar. Empezamos por tu punto de partida.
          </p>
        </Reveal>
        <div className="home-plan-paths">
          <Link to="/planes" className="home-plan-path">
            <div className="home-plan-brands">
              <BrandLogo variant="dark" className="home-plan-jps" />
            </div>
            <div>
              <h3>Entrenamiento</h3>
              <p>Encuentra tu plan y el tiempo que necesitas.</p>
            </div>
            <ArrowUpRight size={24} aria-hidden="true" />
            <span className="home-path-cta">Explora los planes</span>
          </Link>
          <Link to="/planes?tipo=conjunto" className="home-plan-path home-plan-joint">
            <div className="home-plan-brands">
              <BrandLogo variant="dark" className="home-plan-jps" />
              <Plus size={20} aria-hidden="true" />
              <div className="home-plan-jf">
                <div className="jf-logo-crop">
                  <img src={collaborations[0].logo} alt="JF Nutrición" loading="lazy" />
                </div>
              </div>
            </div>
            <div>
              <h3>Entrenamiento + nutrición</h3>
              <p>JPS y JF Nutrición, trabajando juntos.</p>
            </div>
            <ArrowUpRight size={24} aria-hidden="true" />
            <span className="home-path-cta">Descubre los packs</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PartnersPreview() {
  const jf = collaborations[0];
  return (
    <section className="home-partners section-space" aria-labelledby="home-partners-title">
      <div className="v2-container home-partner-strip">
        <div>
          <p className="eyebrow">05 / SUMAMOS CONTIGO</p>
          <h2 id="home-partners-title" className="display-heading">
            Juntos,
            <br />
            <span>más lejos.</span>
          </h2>
          <p>Profesionales y marcas que comparten nuestra forma de entender el deporte.</p>
        </div>
        <div className="home-partner-feature">
          <p className="eyebrow">JPS × JF NUTRICIÓN</p>
          <a className="home-partner-logo" href={jf.instagram} target="_blank" rel="noreferrer">
            <div className="jf-logo-crop">
              <img src={jf.logo} alt="JF Nutrición — Instagram" loading="lazy" />
            </div>
          </a>
          <p>Entrenamiento y nutrición, coordinados para tu objetivo.</p>
          <Link to="/planes?tipo=conjunto" className="text-button">
            Conoce los packs conjuntos <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="home-partner-invite">
          <p>¿Tu marca también vive el deporte?</p>
          <Link to="/contacto?colaboracion=marca" className="text-button">
            Colabora con JPS <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ChallengesPreview() {
  const featuredChallenges = [
    {
      ...runningChallenges[0],
      category: "Correr",
      type: "correr",
      value: runningChallenges[0].distance,
      title: runningChallenges[0].distanceName,
      description: runningChallenges[0].teaser,
      icon: Flag,
    },
    ...[strengthChallenges[0], strengthChallenges[2]].map((challenge) => ({
      ...challenge,
      category: "Fuerza",
      type: "fuerza",
      icon: Dumbbell,
    })),
  ];
  return (
    <section className="home-challenges section-space" aria-labelledby="home-challenges-title">
      <div className="v2-container">
        <Reveal className="home-preview-heading">
          <div>
            <p className="eyebrow">05 / RETOS POR DELANTE</p>
            <h2 id="home-challenges-title" className="display-heading">
              Ponle una meta
              <br />
              <span className="muted-type">a tus ganas.</span>
            </h2>
          </div>
          <Link to="/retos" className="text-button">
            Descubre los retos <ArrowUpRight size={20} />
          </Link>
        </Reveal>
        <div className="home-challenge-grid">
          {featuredChallenges.map((challenge) => (
            <Link
              to={`/retos?tipo=${challenge.type}`}
              className="home-challenge"
              key={challenge.id}
              aria-label={`Descubre el reto: ${challenge.title}`}
            >
              <span className="home-challenge-city">
                <challenge.icon size={16} aria-hidden="true" />
                {challenge.category}
              </span>
              <strong>
                {challenge.value}
                <small>{challenge.unit}</small>
              </strong>
              <h3>{challenge.title}</h3>
              <p className="home-challenge-description">{challenge.description}</p>
              <span className="home-challenge-end">
                Objetivo futuro <ArrowUpRight size={21} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
