import { useState, memo } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

const FLAGS = {
  en: <ReactCountryFlag countryCode="GB" svg style={{ width: '2em', height: '2em' }} />,
  fa: <ReactCountryFlag countryCode="IR" svg style={{ width: '2em', height: '2em' }} />,
};

const LanguageSwitcher = memo(() => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const currentLang = i18n.language;

  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  return (
    <div className="lang-switcher">
      <button
        className="lang-switch-btn glass"
        onClick={() => setOpen(!open)}
      >
        {FLAGS[currentLang]}
        <span className="chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="lang-modal glass">
          <div
            className={`lang-modal-item${currentLang === "en" ? " active" : ""}`}
            onClick={() => handleLangChange("en")}
          >
            {FLAGS.en}
            <span>English</span>
          </div>
          <div
            className={`lang-modal-item${currentLang === "fa" ? " active" : ""}`}
            onClick={() => handleLangChange("fa")}
          >
            {FLAGS.fa}
            <span>فارسی</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default LanguageSwitcher;