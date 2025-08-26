import { useState, memo } from "react";
import { FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useFetch from "../hooks/useFetch";

const GithubProjects = memo(({ view, searchTerm }) => {
  const { t } = useTranslation();
  const username = "M0-kii";

  const { data: repos, loading, error } = useFetch(
    `https://api.github.com/users/${username}/repos?sort=updated`
  );

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`project-list ${view === "grid" ? "grid-view" : ""}`}>
        {loading && <div className="project-card glass">{t("loading")}</div>}
        {error && <div className="project-card glass">{t("error")}</div>}
        {!loading && filteredRepos.length === 0 && (
          <div className="project-card glass no-results-msg">{t("no_results")}</div>
        )}
        {!loading && !error &&
          filteredRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card glass"
            >
              <FaGithub style={{ marginRight: 8 }} />
              <span>{repo.name}</span>
              {repo.language && <span className="repo-lang">{repo.language}</span>}
            </a>
          ))}
      </div>
    </>
  );
});

export default GithubProjects;