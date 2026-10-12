import React from "react";
import { useTranslation } from "react-i18next";
import {
  companyInfo,
  history,
  certifications,
  partners,
  clients,
} from "../data/aboutData";
import useLang from "../hooks/useLang";

function AboutUs() {
  const { t } = useTranslation();
  const lang = useLang();

  return (
    <section id="about-us">
      <div className="section-title">
        <div className="about-hero-inner">
          <div className="about-eyebrow">{t("about.eyebrowMain")}</div>
          <h1>{t("about.heroTitle")}</h1>
          <p>
            {t("about.heroDesc1")}
            <br />
            {t("about.heroDesc2")}
          </p>
        </div>
      </div>

      <div id="greeting" className="about-section-head">
        <div className="about-eyebrow-green">Company Profile</div>
        <h2>{t("about.companyInfoTitle")}</h2>
      </div>
      <div className="about-info-wrap">
        <dl className="about-info-grid">
          {companyInfo.map((row) => (
            <div className="about-info-row" key={row.k.ko}>
              <dt>{row.k[lang]}</dt>
              <dd>{row.v[lang]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div id="history" className="about-history">
        <div className="about-section-head">
          <div className="about-eyebrow-green">History</div>
          <h2>{t("about.historyTitle")}</h2>
          <p>{t("about.historyDesc")}</p>
        </div>

        <div className="about-history-list">
          {history.map((yr) => (
            <div className="about-history-item" key={yr.year}>
              <div>
                <div className="about-history-year">{yr.year}</div>
                <div className="about-history-tag">{yr.tag[lang]}</div>
              </div>
              <div className="about-history-events">
                {yr.items[lang].map((ev, idx) => (
                  <div className="about-history-event" key={idx}>
                    <div className="about-history-dot"></div>
                    <span>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="certified">
        <div className="about-section-head">
          <div className="about-eyebrow-green">Certifications</div>
          <h2>{t("about.certTitle")}</h2>
        </div>
        <div className="about-certs-grid">
          {certifications.map((c) => (
            <div className="about-cert-card" key={c.t.ko}>
              <div className="cert-title">{c.t[lang]}</div>
              <div className="cert-desc">{c.d[lang]}</div>
            </div>
          ))}
        </div>
        {/* 인증서 이미지 */}
        <div className="about-cert-gallery">
          <div className="about-gallery-card">
            <img src="/images/c1.png" alt="" />
          </div>
          <div className="about-gallery-card">
            <img src="/images/c2.png" alt="" />
          </div>
          <div className="about-gallery-card">
            <img src="/images/c3.png" alt="" />
          </div>
          <div className="about-gallery-card">
            <img src="/images/c4.png" alt="" />
          </div>
        </div>
      </div>

      <div id="partners">
        <div className="about-section-head">
          <div className="about-eyebrow-green">Partners</div>
          <h2>{t("about.partnersTitle")}</h2>
          <p>{t("about.partnersDesc")}</p>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track marquee-left">
            {[...partners, ...partners].map((p, idx) => (
              <div className="marquee-logo" key={`${p.name.ko}-${idx}`}>
                <img src={p.img} alt={p.name[lang]} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="clients">
        <div className="about-section-head">
          <div className="about-eyebrow-green">Clients</div>
          <h2>{t("about.clientsTitle")}</h2>
          <p>{t("about.clientsDesc")}</p>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track marquee-right">
            {[...clients, ...clients].map((c, idx) => (
              <div className="marquee-logo" key={`${c.name.ko}-${idx}`}>
                <img src={c.img} alt={c.name[lang]} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;