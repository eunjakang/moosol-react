import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-container">
        <div>
          <p>
            <strong>{t("footer.company")}</strong>
          </p>
          <p style={{ marginTop: "5px", opacity: 0.9 }}>
            &emsp;&nbsp;{t("footer.hqLine")} <br />
            &emsp;&nbsp;{t("footer.labLine")}
          </p>
        </div>
        <div
          className="footer-links-center"
          style={{ display: "flex", gap: "30px" }}
        >
          <a href="/privacy" style={{ color: "#728c77", textDecoration: "none" }}>
            {t("footer.privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;