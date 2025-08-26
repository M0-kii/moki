import { memo, useEffect, useRef } from "react";
import { FaGithub, FaDiscord, FaTelegram, FaInstagram, FaSteam, FaSpotify } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ProjectsTabs from "./components/ProjectsTabs";
import SkillsTab from "./components/SkillsTab";
import InfoCircle from "./components/InfoCircle";
import ErrorBoundary from "./components/ErrorBoundary";
import "./styles/Home.css";

const PROFILE_IMAGE_URL = "/profile.png";

const SOCIALS = [
  { href: "https://github.com/M0-kii", label: "GitHub", icon: <FaGithub /> },
  { href: "https://discord.com/users/952855382030700555", label: "Discord", icon: <FaDiscord /> },
  { href: "https://t.me/M0_ki", label: "Telegram", icon: <FaTelegram /> },
  { href: "https://www.instagram.com/m0_kiii/", label: "Instagram", icon: <FaInstagram /> },
  { href: "https://steamcommunity.com/id/M0_ki/", label: "Steam", icon: <FaSteam /> },
  { href: "https://open.spotify.com/user/31uezkjpm5ytkbrhhwl64rjp4qr4", label: "Spotify", icon: <FaSpotify /> },
];

const Home = memo(() => {
  const { t } = useTranslation();
  const canvasRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const numStars = 400;
    const meteors = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function createStars() {
      starsRef.current = [];
      for (let i = 0; i < numStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.8 + 0.2,
          speed: Math.random() * 0.4 + 0.05,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      }
    }

    function createMeteor() {
      if (Math.random() > 0.995) {
        const angle = Math.random() * Math.PI * 2;
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const speed = Math.random() * 5 + 2;
        meteors.push({
          x: startX,
          y: startY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          progress: 0,
          length: Math.random() * 100 + 50,
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
    }

    function drawMeteors() {
      meteors.forEach((meteor, index) => {
        ctx.save();
        ctx.translate(meteor.x, meteor.y);
        ctx.rotate(Math.atan2(meteor.vy, meteor.vx));

        const gradient = ctx.createLinearGradient(0, 0, meteor.length, 0);
        gradient.addColorStop(0, `rgba(255, 255, 255, 1)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, meteor.length, 2);

        ctx.restore();
        meteor.x += meteor.vx;
        meteor.y += meteor.vy;

        if (meteor.x < -meteor.length || meteor.x > canvas.width + meteor.length || meteor.y > canvas.height + meteor.length) {
          meteors.splice(index, 1);
        }
      });
    }

    function updateStars() {
      starsRef.current.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 50;
      mouseY = (e.clientY - window.innerHeight / 2) / 50;
    };

    const animate = () => {
      updateStars();
      starsRef.current.forEach(star => {
        star.x += (mouseX * star.speed);
        star.y += (mouseY * star.speed);
      });
      createMeteor();
      drawStars();
      drawMeteors();
      requestAnimationFrame(animate);
    };

    createStars();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="dashboard-section">
      <canvas id="space-bg" className="space-bg-canvas" ref={canvasRef} />
      <ErrorBoundary>
        <LanguageSwitcher />
        <header className="header fade-in"></header>
        <div className="main-glass-layout">
          <div className="main-left">
            <div className="profile-card glass fade-in-up">
              <img
                src={PROFILE_IMAGE_URL}
                alt="Profile"
                className="profile-img"
              />
              <h2 className="main-title">{t("title")}</h2>
              <p className="subtitle">{t("subtitle")}</p>
              <div className="social-list">
                {SOCIALS.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
            <SkillsTab />
          </div>
          <ProjectsTabs />
        </div>
        <InfoCircle />
      </ErrorBoundary>
    </section>
  );
});

export default Home;
