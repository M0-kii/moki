import { useState, memo } from "react";
import { useTranslation } from "react-i18next";

const InfoCircle = memo(() => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="info-circle-container">
      <button className="info-circle-btn" onClick={() => setOpen(!open)} title="Info">
        <span className="exclam">?</span>
      </button>
      {open && (
        <div className="info-bubble glass">
          <span>{t("built_by")} <strong>M0-kii</strong></span>
          <a href="https://github.com/M0-kii" target="_blank" rel="noopener noreferrer">
            {t("github_tab")}
          </a>
        </div>
      )}
    </div>
  );
});

export default InfoCircle;