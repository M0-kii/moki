import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { FaDownload } from "react-icons/fa";
import { MdOutlineBrokenImage } from "react-icons/md";
import useFetch from "../hooks/useFetch";

const ModrinthProjects = memo(({ view, searchTerm }) => {
  const { t } = useTranslation();
  const username = "M0_kii";
  const { data: projects, loading, error } = useFetch(
    `https://api.modrinth.com/v2/user/${username}/projects?sort=downloads`
  );

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`project-list ${view === "grid" ? "grid-view" : ""}`}>
        {loading && <div className="project-card glass">{t("loading")}</div>}
        {error && <div className="project-card glass">{t("error")}</div>}
        {!loading && filteredProjects.length === 0 && (
          <div className="project-card glass no-results-msg">{t("no_results")}</div>
        )}
        {!loading && !error && filteredProjects.map(project => (
          <a
            key={project.id}
            href={`https://modrinth.com/project/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card modrinth-card"
          >
            <div className="modrinth-icon-container">
              {project.icon_url ? (
                <img
                  src={project.icon_url}
                  alt={`${project.title} icon`}
                  className="modrinth-icon"
                />
              ) : (
                <MdOutlineBrokenImage size={32} color="#fff" />
              )}
            </div>
            <div className="modrinth-info">
              <span className="modrinth-title">{project.title}</span>
              <div className="modrinth-stats">
                <div className="stat-item">
                  <FaDownload size={14} color="#b393f6" />
                  <span>{formatNumber(project.downloads)}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
});

export default ModrinthProjects;