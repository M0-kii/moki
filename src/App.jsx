import { useState, useEffect, Suspense, lazy } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Home from "./Home";
import "./i18n";
import "./styles/Home.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeout(true);
      setTimeout(() => setIsLoading(false), 500); 
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>M0-kii</title>
        <meta name="description" content="M0-kii's personal portfolio website. A frontend developer showcasing projects, skills, and more." />
        <meta name="keywords" content="M0-kii, M0-kii.dev, developer, frontend, react, portfolio, github" />
        <meta name="author" content="M0-kii" />
      </Helmet>
      {isLoading && (
        <div className={`loading-overlay ${fadeout ? "fade-out" : ""}`}>
          <div className="loading-content">
            <div className="fancy-loader">
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
              <span className="loader-dot"></span>
            </div>
            <p className="loading-text">loading good things.. (:</p>
          </div>
        </div>
      )}
      {!isLoading && <Home />}
    </HelmetProvider>
  );
}

export default App;