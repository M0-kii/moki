import { useState, memo } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch, FaList, FaTh } from "react-icons/fa";
import GithubProjects from "./GithubProjects";
import ModrinthProjects from "./ModrinthProjects";

const ProjectsTabs = memo(() => {
  const { t } = useTranslation();
  const [tab, setTab] = useState("all");
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="projects-box glass">
      <h2>{t("projects_title")}</h2>
      <div className="projects-controls">
        <div className="projects-tabs">
          <button className={tab === "all" ? "active" : ""} onClick={() => setTab("all")}>
            {t("all_tab")}
          </button>
          <button className={tab === "github" ? "active" : ""} onClick={() => setTab("github")}>
            {t("github_tab")}
          </button>
          <button className={tab === "modrinth" ? "active" : ""} onClick={() => setTab("modrinth")}>
            {t("modrinth_tab")}
          </button>
        </div>
        <div className="projects-options">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            onClick={() => setView(view === "list" ? "grid" : "list")}
            className="view-toggle-btn glass"
            title={view === "list" ? t("grid_view") : t("list_view")}
          >
            {view === "list" ? <FaTh size={20} /> : <FaList size={20} />}
          </button>
        </div>
      </div>
      {tab === "all" ? (
        <>
          <GithubProjects view={view} searchTerm={searchTerm} />
          <ModrinthProjects view={view} searchTerm={searchTerm} />
        </>
      ) : tab === "github" ? (
        <GithubProjects view={view} searchTerm={searchTerm} />
      ) : (
        <ModrinthProjects view={view} searchTerm={searchTerm} />
      )}
    </div>
  );
});

export default ProjectsTabs;