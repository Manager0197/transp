import { useState } from "react";

const sections = [
  {
    id: "overview",
    icon: "📦",
    title: "Vue d'ensemble",
    color: "#F97316",
    content: null,
  },
  {
    id: "dossier",
    icon: "🗂️",
    title: "Gestion des Dossiers BL",
    color: "#3B82F6",
    content: null,
  },
  {
    id: "transport",
    icon: "🚛",
    title: "Transport Interne & Externe",
    color: "#10B981",
    content: null,
  },
  {
    id: "finance",
    icon: "💰",
    title: "Gestion Financière",
    color: "#F59E0B",
    content: null,
  },
  {
    id: "rapports",
    icon: "📊",
    title: "Rapports & Statistiques",
    color: "#8B5CF6",
    content: null,
  },
  {
    id: "modules",
    icon: "🧩",
    title: "Modules de l'Application",
    color: "#EC4899",
    content: null,
  },
];

const dataModel = [
  {
    entity: "Dossier BL",
    color: "#F97316",
    fields: [
      { name: "N° Dossier BL", type: "Identifiant unique", required: true },
      { name: "Date de création", type: "Date", required: true },
      { name: "Nombre de conteneurs", type: "Entier", required: true },
      { name: "Statut", type: "Enum (En cours / Clôturé)", required: true },
    ],
  },
  {
    entity: "Conteneur",
    color: "#3B82F6",
    fields: [
      { name: "N° Conteneur", type: "Identifiant unique", required: true },
      { name: "N° Dossier BL (lié)", type: "Clé étrangère", required: true },
      { name: "Type", type: "Texte (20', 40', etc.)", required: false },
      { name: "Statut chargement", type: "Enum", required: true },
    ],
  },
  {
    entity: "Camion Interne",
    color: "#10B981",
    fields: [
      { name: "N° Camion (ex: AB, BC)", type: "Identifiant unique", required: true },
      { name: "Conducteur", type: "Texte", required: false },
      { name: "Statut", type: "Actif / Inactif", required: true },
    ],
  },
  {
    entity: "Chargement",
    color: "#8B5CF6",
    fields: [
      { name: "N° Dossier BL", type: "Clé étrangère", required: true },
      { name: "N° Conteneur", type: "Clé étrangère", required: true },
      { name: "Type transporteur", type: "Enum (Interne/Externe)", required: true },
      { name: "N° Camion", type: "Clé étrangère ou texte libre", required: true },
      { name: "Avance perçue", type: "Montant (FCFA)", required: true },
      { name: "Solde restant", type: "Montant calculé", required: true },
      { name: "Statut paiement", type: "Payé / Non payé", required: true },
      { name: "Date chargement", type: "Date", required: true },
    ],
  },
];

const appModules = [
  {
    title: "Tableau de Bord",
    icon: "🏠",
    color: "#F97316",
    features: [
      "Nombre total de dossiers actifs",
      "Chargements du jour / semaine",
      "Montants dus vs payés",
      "Alertes soldes impayés",
    ],
  },
  {
    title: "Dossiers BL",
    icon: "📁",
    color: "#3B82F6",
    features: [
      "Créer / modifier un dossier",
      "Lister les conteneurs du dossier",
      "Voir détail : interne / externe",
      "Filtrer par date, statut",
    ],
  },
  {
    title: "Gestion Camions",
    icon: "🚛",
    color: "#10B981",
    features: [
      "Liste des camions internes (AB, BC…)",
      "Historique des chargements par camion",
      "Filtres mensuel & semestriel",
      "Total avances & soldes par camion",
    ],
  },
  {
    title: "Paiements",
    icon: "💳",
    color: "#F59E0B",
    features: [
      "Liste des paiements en attente",
      "Bouton « Marquer comme payé »",
      "Historique des paiements",
      "Calcul automatique : avance + solde",
    ],
  },
  {
    title: "Rapports",
    icon: "📊",
    color: "#8B5CF6",
    features: [
      "Rapport semestriel PDF/Excel",
      "Dossiers traités & chargements",
      "Répartition interne / externe",
      "Bilan financier (payé / restant)",
    ],
  },
  {
    title: "Paramètres",
    icon: "⚙️",
    color: "#6B7280",
    features: [
      "Gestion des camions internes",
      "Ajout transporteurs externes",
      "Tarifs & grilles fiscales",
      "Gestion utilisateurs & accès",
    ],
  },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const [expandedEntity, setExpandedEntity] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0E1A",
      fontFamily: "'Courier New', monospace",
      color: "#E2E8F0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        borderBottom: "2px solid #F97316",
        padding: "32px 24px 24px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, right: 0, width: "300px", height: "100%",
          background: "radial-gradient(ellipse at top right, rgba(249,115,22,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
          <div style={{
            width: "56px", height: "56px", background: "#F97316",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", flexShrink: 0, clipPath: "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
          }}>📦</div>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#F97316", marginBottom: "4px", textTransform: "uppercase" }}>
              Cahier des Charges · v1.0
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(20px, 4vw, 32px)", fontWeight: "900", letterSpacing: "-1px", lineHeight: 1.1 }}>
              TRANSPORT<br />
              <span style={{ color: "#F97316" }}>CONTENEUR</span> APP
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#94A3B8", maxWidth: "500px" }}>
              Application Web & Mobile de gestion des dossiers BL, chargements de conteneurs et suivi financier des transporteurs.
            </p>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: "8px", marginTop: "20px", maxWidth: "900px", margin: "20px auto 0", flexWrap: "wrap" }}>
          {["Web App", "Mobile App", "Multi-utilisateurs", "Rapports PDF", "Filtres avancés"].map(b => (
            <span key={b} style={{
              background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)",
              color: "#FB923C", padding: "4px 12px", fontSize: "11px", letterSpacing: "1px",
            }}>{b}</span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: "#0F172A", borderBottom: "1px solid #1E293B",
        padding: "0 24px", overflowX: "auto",
      }}>
        <div style={{ display: "flex", maxWidth: "900px", margin: "0 auto" }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "14px 16px", fontSize: "12px", letterSpacing: "1px",
              color: activeSection === s.id ? s.color : "#64748B",
              borderBottom: activeSection === s.id ? `2px solid ${s.color}` : "2px solid transparent",
              whiteSpace: "nowrap", fontFamily: "inherit", transition: "all 0.2s",
            }}>
              {s.icon} {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>

        {/* OVERVIEW */}
        {activeSection === "overview" && (
          <div>
            <SectionTitle color="#F97316" title="Objectif du Projet" />
            <div style={{
              background: "#0F172A", border: "1px solid #1E293B",
              padding: "20px 24px", marginBottom: "24px",
              borderLeft: "4px solid #F97316",
            }}>
              <p style={{ margin: 0, lineHeight: 1.8, fontSize: "14px", color: "#CBD5E1" }}>
                Développer une application permettant de <strong style={{ color: "#F97316" }}>gérer les dossiers de transport de conteneurs</strong>,
                en distinguant les camions internes des transporteurs externes, de suivre les chargements par conteneur,
                les avances versées et les soldes restants, avec des rapports périodiques de synthèse.
              </p>
            </div>

            <SectionTitle color="#F97316" title="Flux Principal — Exemple Concret" />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
              {[
                { step: "01", label: "Création du dossier BL", desc: "Ex : Dossier BL #2024-045 avec 5 conteneurs enregistrés (CXMU123, CXMU124…)", color: "#F97316" },
                { step: "02", label: "Affectation des transporteurs", desc: "Interne : camion AB prend 2 conteneurs / Externe : transporteur tiers prend 3 conteneurs", color: "#3B82F6" },
                { step: "03", label: "Enregistrement des avances", desc: "Camion AB : avance 50 000 FCFA × 2 conteneurs = 100 000 FCFA d'avance totale", color: "#10B981" },
                { step: "04", label: "Suivi financier", desc: "Calcul automatique du solde restant. Bouton « Payé » pour solder chaque chargement", color: "#F59E0B" },
                { step: "05", label: "Rapport semestriel", desc: "Synthèse : dossiers traités, conteneurs internes/externes, montants payés et restants", color: "#8B5CF6" },
              ].map(item => (
                <div key={item.step} style={{
                  display: "flex", gap: "16px", alignItems: "flex-start",
                  background: "#0F172A", border: "1px solid #1E293B", padding: "16px",
                }}>
                  <div style={{
                    width: "40px", height: "40px", background: item.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: "900", flexShrink: 0, color: "#0A0E1A",
                  }}>{item.step}</div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "14px", color: item.color, marginBottom: "4px" }}>{item.label}</div>
                    <div style={{ fontSize: "13px", color: "#94A3B8" }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOSSIER */}
        {activeSection === "dossier" && (
          <div>
            <SectionTitle color="#3B82F6" title="Gestion des Dossiers BL" />
            <GridCards items={[
              { title: "Création d'un dossier", icon: "➕", color: "#3B82F6", items: ["Saisir le N° de dossier BL", "Ajouter les N° de conteneurs (multiple)", "Date de création automatique", "Statut : En cours / Clôturé"] },
              { title: "Vue détail dossier", icon: "🔍", color: "#3B82F6", items: ["Liste de tous les conteneurs", "Camion assigné par conteneur", "Type : Interne ou Externe", "Avance + Solde par ligne"] },
              { title: "Filtres & Recherche", icon: "🔎", color: "#3B82F6", items: ["Recherche par N° dossier BL", "Filtrer par statut (En cours / Clôturé)", "Filtrer par date", "Filtrer par type de transporteur"] },
            ]} />

            <SectionTitle color="#3B82F6" title="Règles Métier — Chargements" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { label: "1 camion → N conteneurs", desc: "Un seul camion interne peut charger plusieurs conteneurs du même dossier" },
                { label: "N camions → 1 conteneur", desc: "Plusieurs camions peuvent se partager les conteneurs d'un dossier (1 chacun)" },
                { label: "Mixte interne + externe", desc: "Un dossier peut avoir simultanément des camions internes ET des transporteurs externes" },
                { label: "Tout interne possible", desc: "Un dossier peut être intégralement chargé par les camions internes si disponibles" },
              ].map(r => (
                <div key={r.label} style={{ background: "#0F172A", border: "1px solid #1E3A5F", padding: "16px" }}>
                  <div style={{ color: "#60A5FA", fontWeight: "700", fontSize: "13px", marginBottom: "6px" }}>◆ {r.label}</div>
                  <div style={{ color: "#94A3B8", fontSize: "12px" }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRANSPORT */}
        {activeSection === "transport" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
              <div style={{ background: "#0F172A", border: "2px solid #10B981", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "24px" }}>🚛</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#10B981", letterSpacing: "2px" }}>FLOTTE PROPRE</div>
                    <div style={{ fontWeight: "900", fontSize: "18px" }}>INTERNE</div>
                  </div>
                </div>
                {["Camions identifiés par code (AB, BC, CA, ZA…)", "Enregistrés dans le système", "Suivi individuel des chargements", "Historique mensuel & semestriel", "Avances & soldes tracés par camion", "Rapport de paiements individuels"].map(f => (
                  <div key={f} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "#10B981", fontSize: "12px", marginTop: "2px" }}>✓</span>
                    <span style={{ fontSize: "12px", color: "#CBD5E1" }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#0F172A", border: "2px solid #F59E0B", padding: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "24px" }}>🔀</span>
                  <div>
                    <div style={{ fontSize: "11px", color: "#F59E0B", letterSpacing: "2px" }}>SOUS-TRAITANCE</div>
                    <div style={{ fontWeight: "900", fontSize: "18px" }}>EXTERNE</div>
                  </div>
                </div>
                {["Identité non connue à l'avance", "Saisie libre au moment du chargement", "Possibilité d'ajouter un nouveau transporteur", "Historique par dossier BL", "Avances & soldes tracés", "Inclus dans les rapports globaux"].map(f => (
                  <div key={f} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "flex-start" }}>
                    <span style={{ color: "#F59E0B", fontSize: "12px", marginTop: "2px" }}>✓</span>
                    <span style={{ fontSize: "12px", color: "#CBD5E1" }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <SectionTitle color="#10B981" title="Fiche Camion Interne" />
            <div style={{ background: "#0F172A", border: "1px solid #1E293B", padding: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {[
                  { label: "N° Camion", value: "AB", desc: "Code identifiant" },
                  { label: "Total chargements", value: "47", desc: "Depuis création" },
                  { label: "Ce mois", value: "8", desc: "Filtrage mensuel" },
                  { label: "Ce semestre", value: "23", desc: "Filtrage semestriel" },
                  { label: "Total avances", value: "1 150 000", desc: "FCFA perçus" },
                  { label: "Solde restant", value: "350 000", desc: "FCFA à payer" },
                ].map(stat => (
                  <div key={stat.label} style={{ background: "#1E293B", padding: "14px", textAlign: "center" }}>
                    <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px", marginBottom: "4px" }}>{stat.label}</div>
                    <div style={{ fontSize: "22px", fontWeight: "900", color: "#10B981" }}>{stat.value}</div>
                    <div style={{ fontSize: "10px", color: "#475569", marginTop: "2px" }}>{stat.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FINANCE */}
        {activeSection === "finance" && (
          <div>
            <SectionTitle color="#F59E0B" title="Modèle Financier par Chargement" />
            <div style={{
              background: "#0F172A", border: "1px solid #1E293B", padding: "24px",
              marginBottom: "24px", borderLeft: "4px solid #F59E0B",
            }}>
              <div style={{ fontSize: "13px", color: "#94A3B8", marginBottom: "16px" }}>
                Exemple — Dossier BL #045 · 5 conteneurs · Camion AB (interne)
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "#1E293B" }}>
                {[
                  ["Conteneurs chargés", "2"],
                  ["Avance / conteneur", "50 000 FCFA"],
                  ["Total avance", "100 000 FCFA"],
                  ["Prix total convenu", "150 000 FCFA"],
                  ["Solde restant", "50 000 FCFA"],
                  ["Statut", "⏳ Non payé"],
                ].map(([k, v]) => (
                  <div key={k} style={{ background: "#0F172A", padding: "12px 16px" }}>
                    <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>{k}</div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#F59E0B" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <SectionTitle color="#F59E0B" title="Fonctionnalités de Paiement" />
            <GridCards items={[
              { title: "Enregistrement avance", icon: "💵", color: "#F59E0B", items: ["Saisie de l'avance au moment du chargement", "Montant par conteneur ou global", "Date et heure horodatées", "Historique modifiable"] },
              { title: "Calcul automatique", icon: "🧮", color: "#F59E0B", items: ["Solde = Prix total − Avance", "Mise à jour en temps réel", "Alertes si solde impayé > X jours", "Cumul par camion / dossier"] },
              { title: "Action « Payé »", icon: "✅", color: "#10B981", items: ["Bouton dédié par ligne de chargement", "Confirmation requise avant validation", "Horodatage du paiement", "Notification optionnelle"] },
            ]} />

            <SectionTitle color="#F59E0B" title="Fiscalité & Coûts" />
            <div style={{ background: "#0F172A", border: "1px solid #1E293B", padding: "16px" }}>
              <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#94A3B8" }}>
                Paramètres configurables dans les réglages de l'application :
              </p>
              {["Taux de TVA applicable (si requis)", "Grille tarifaire par type de conteneur (20', 40'…)", "Frais supplémentaires (surcharge, péage…)", "Devise principale (FCFA) avec possibilité d'ajustement"].map(item => (
                <div key={item} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ color: "#F59E0B" }}>→</span>
                  <span style={{ fontSize: "13px", color: "#CBD5E1" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RAPPORTS */}
        {activeSection === "rapports" && (
          <div>
            <SectionTitle color="#8B5CF6" title="Rapport Semestriel" />
            <div style={{ background: "#0F172A", border: "2px solid #8B5CF6", padding: "24px", marginBottom: "24px" }}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#8B5CF6", marginBottom: "12px" }}>CONTENU DU RAPPORT</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { cat: "Dossiers", items: ["Nombre total de dossiers traités", "Dossiers en cours vs clôturés", "Nombre total de conteneurs"] },
                  { cat: "Chargements", items: ["Total chargements effectués", "Répartition Interne / Externe", "Chargements par camion interne"] },
                  { cat: "Finances", items: ["Total avances versées", "Total soldes payés", "Total soldes restants à payer"] },
                  { cat: "Camions", items: ["Classement par volume de chargement", "Camion le plus actif du semestre", "Historique paiements par camion"] },
                ].map(block => (
                  <div key={block.cat} style={{ background: "#1E293B", padding: "14px" }}>
                    <div style={{ color: "#A78BFA", fontSize: "12px", fontWeight: "700", marginBottom: "8px" }}>{block.cat}</div>
                    {block.items.map(i => (
                      <div key={i} style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "4px" }}>· {i}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <SectionTitle color="#8B5CF6" title="Filtres Disponibles" />
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {["Mensuel", "Trimestriel", "Semestriel", "Annuel", "Plage personnalisée", "Par camion", "Par dossier BL", "Par statut paiement"].map(f => (
                <div key={f} style={{
                  background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)",
                  color: "#A78BFA", padding: "8px 16px", fontSize: "12px", letterSpacing: "1px",
                }}>{f}</div>
              ))}
            </div>
          </div>
        )}

        {/* MODULES */}
        {activeSection === "modules" && (
          <div>
            <SectionTitle color="#EC4899" title="Modules de l'Application" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
              {appModules.map(mod => (
                <div key={mod.title} style={{
                  background: "#0F172A", border: `1px solid ${mod.color}30`,
                  padding: "18px", transition: "border-color 0.2s",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "20px" }}>{mod.icon}</span>
                    <span style={{ fontWeight: "700", fontSize: "14px", color: mod.color }}>{mod.title}</span>
                  </div>
                  {mod.features.map(f => (
                    <div key={f} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
                      <span style={{ color: mod.color, fontSize: "10px", marginTop: "3px" }}>▸</span>
                      <span style={{ fontSize: "12px", color: "#94A3B8" }}>{f}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <SectionTitle color="#EC4899" title="Modèle de Données" />
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {dataModel.map(entity => (
                <div key={entity.entity} style={{
                  background: "#0F172A", border: `1px solid ${entity.color}40`,
                  overflow: "hidden",
                }}>
                  <button onClick={() => setExpandedEntity(expandedEntity === entity.entity ? null : entity.entity)}
                    style={{
                      width: "100%", background: "none", border: "none", cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "14px 18px", fontFamily: "inherit",
                    }}>
                    <span style={{ fontWeight: "700", color: entity.color, fontSize: "14px" }}>
                      ◈ {entity.entity}
                    </span>
                    <span style={{ color: "#64748B", fontSize: "12px" }}>
                      {expandedEntity === entity.entity ? "▲" : "▼"} {entity.fields.length} champs
                    </span>
                  </button>
                  {expandedEntity === entity.entity && (
                    <div style={{ borderTop: `1px solid ${entity.color}30` }}>
                      {entity.fields.map(f => (
                        <div key={f.name} style={{
                          display: "grid", gridTemplateColumns: "1fr 1fr auto",
                          padding: "10px 18px", borderBottom: "1px solid #1E293B",
                          fontSize: "12px",
                        }}>
                          <span style={{ color: "#E2E8F0" }}>{f.name}</span>
                          <span style={{ color: "#64748B" }}>{f.type}</span>
                          <span style={{ color: f.required ? "#F97316" : "#475569", fontSize: "10px" }}>
                            {f.required ? "REQUIS" : "Optionnel"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <SectionTitle color="#EC4899" title="Stack Technique Recommandée" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[
                { cat: "Frontend Web", items: ["React.js / Next.js", "TailwindCSS", "Chart.js (graphiques)"], color: "#3B82F6" },
                { cat: "Mobile", items: ["React Native", "Expo", "Compatible iOS & Android"], color: "#10B981" },
                { cat: "Backend", items: ["Node.js / Express", "PostgreSQL", "REST API + Auth JWT"], color: "#F59E0B" },
              ].map(t => (
                <div key={t.cat} style={{ background: "#0F172A", border: `1px solid ${t.color}40`, padding: "14px" }}>
                  <div style={{ color: t.color, fontSize: "12px", fontWeight: "700", marginBottom: "8px" }}>{t.cat}</div>
                  {t.items.map(i => <div key={i} style={{ fontSize: "11px", color: "#64748B", marginBottom: "4px" }}>· {i}</div>)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1E293B", padding: "16px 24px",
        textAlign: "center", fontSize: "11px", color: "#334155", letterSpacing: "2px",
      }}>
        TRANSPORT CONTENEUR APP · CAHIER DES CHARGES · 2025
      </div>
    </div>
  );
}

function SectionTitle({ title, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", marginTop: "8px" }}>
      <div style={{ width: "4px", height: "20px", background: color }} />
      <h2 style={{ margin: 0, fontSize: "13px", fontWeight: "700", letterSpacing: "3px", color, textTransform: "uppercase" }}>{title}</h2>
    </div>
  );
}

function GridCards({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px", marginBottom: "24px" }}>
      {items.map(card => (
        <div key={card.title} style={{ background: "#0F172A", border: `1px solid ${card.color}40`, padding: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span>{card.icon}</span>
            <span style={{ fontWeight: "700", fontSize: "13px", color: card.color }}>{card.title}</span>
          </div>
          {card.items.map(i => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "6px" }}>
              <span style={{ color: card.color, fontSize: "10px", marginTop: "3px" }}>▸</span>
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>{i}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
