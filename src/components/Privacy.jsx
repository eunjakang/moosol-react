import React from "react";
import { useTranslation } from "react-i18next";

function Privacy() {
  const { t } = useTranslation();

  return (
    <section id="privacy">
      <div className="privacy-container">
        <div className="privacy-header">
          <h1>{t("privacy.title")}</h1>
          <p>{t("privacy.intro")}</p>
        </div>

        <div className="privacy-section">
          <h2>{t("privacy.a1Title")}</h2>
          <p>{t("privacy.a1Desc")}</p>
          <div className="privacy-card">
            <ul>
              {t("privacy.a1List", { returnObjects: true }).map((item, idx) => (
                <li key={idx}>
                  <strong>{item}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2>{t("privacy.a2Title")}</h2>
          <p>{t("privacy.a2Desc")}</p>
          <div className="privacy-card">
            <ul>
              <li>
                <strong>{t("privacy.a2ItemsLabel")}</strong> {t("privacy.a2Items")}
              </li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2>{t("privacy.a3Title")}</h2>
          <p>{t("privacy.a3Desc")}</p>
          <div className="privacy-card">
            <ul>
              <li>
                <strong>{t("privacy.a3Item1Label")}</strong> {t("privacy.a3Item1Desc")}
              </li>
              <li>
                <strong>{t("privacy.a3Item2Label")}</strong> {t("privacy.a3Item2Desc")}
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="privacy-section">
          <h2>제 4 조 (개인정보의 제공 및 위탁)</h2>
          ...
        </div> */}

        <div className="privacy-section">
          <h2>{t("privacy.a4Title")}</h2>
          <p>{t("privacy.a4Desc")}</p>
          <div className="privacy-card">
            <ul>
              <li>
                <strong>{t("privacy.a4Item1Label")}</strong> {t("privacy.a4Item1Desc")}
              </li>
              <li>
                <strong>{t("privacy.a4Item2Label")}</strong> {t("privacy.a4Item2Desc")}
              </li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2>{t("privacy.a5Title")}</h2>
          <p>{t("privacy.a5Desc")}</p>
          <table className="privacy-table">
            <thead>
              <tr>
                <th>{t("privacy.a5ColCategory")}</th>
                <th>{t("privacy.a5ColOfficer")}</th>
                <th>{t("privacy.a5ColManager")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{t("privacy.a5RowNameTitle")}</td>
                <td>{t("privacy.officerName")}</td>
                <td>{t("privacy.managerName")}</td>
              </tr>
              <tr>
                <td>{t("privacy.a5RowEmail")}</td>
                <td>thmvhu@moosol.co.kr</td>
                <td>wjdzmsquf@moosol.co.kr</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="privacy-section">
          <h2>{t("privacy.a6Title")}</h2>
          <p>{t("privacy.a6Desc")}</p>
          <ul className="contact-list">
            {t("privacy.a6List", { returnObjects: true }).map((item, idx) => (
              <li key={idx}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Privacy;