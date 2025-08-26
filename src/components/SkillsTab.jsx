import { useState, useEffect, memo } from "react";
import { FaJs, FaPython, FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import { SiCplusplus, SiUnrealengine } from "react-icons/si";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { name: "JavaScript", percent: 69, icon: <FaJs color="#f7e018" /> },
  { name: "Python", percent: 53, icon: <FaPython color="#3776ab" /> },
  { name: "Java", percent: 77, icon: <FaJava color="#f44336" /> },
  { name: "React", percent: 85, icon: <FaReact color="#61dafb" /> },
  { name: "Node.js", percent: 82, icon: <FaNodeJs color="#3c873a" /> },
  { name: "C++", percent: 37, icon: <SiCplusplus color="#398ee9ff" /> },
  { name: "CSS", percent: 99, icon: <SiCplusplus color="#00ffffff" /> },
  { name: "Unreal Engine", percent: 45, icon: <SiUnrealengine color="#ffffffff" /> },
];

const SkillsTab = memo(() => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true) }, []);

  return (
    <div className="skills-tab glass">
      <h2>{t("skills_title")}</h2>
      <div className="skills-list">
        {LANGUAGES.map(skill => (
          <div className="skill-row" key={skill.name}>
            <div className="skill-info">
              {skill.icon}
              <span>{skill.name}</span>
            </div>
            <div className="skill-progress">
              <div className="bar-bg">
                <div
                  className="bar-fill"
                  style={{
                    width: mounted ? `${skill.percent}%` : `0%`,
                    transition: mounted ? 'width 1.2s cubic-bezier(.62,1.4,.36,1)' : 'none',
                    background: `linear-gradient(90deg,#8F5CFF 20%, #b393f6 80%)`
                  }}
                >
                  <span className="percent-inside">{skill.percent}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SkillsTab;