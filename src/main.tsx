import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/revision.css";
import "./styles/action.css";
import "./styles/community.css";
import "./styles/navigation.css";
import "./styles/mobile.css";
import "./styles/plans.css";
import "./styles/home.css";
import "./styles/page-layout.css";
import "./styles/challenges.css";
import "./styles/brand.css";
import "./styles/contact.css";
import "./styles/home-light.css";
import "./styles/design-rhythm.css";
import "./styles/plans-compact.css";
import "./styles/collaborations.css";

// Preserve previously shared hash-router links, including their query parameters.
if (location.hash.startsWith("#/")) {
  history.replaceState(null, "", location.hash.slice(1));
}
if (
  import.meta.env.PROD &&
  location.protocol === "http:" &&
  /^(www\.)?jperformancesystem\.es$/.test(location.hostname)
) {
  location.replace(
    `https://${location.host}${location.pathname}${location.search}${location.hash}`
  );
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
