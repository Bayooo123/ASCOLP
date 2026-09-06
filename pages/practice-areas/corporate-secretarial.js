import InfoPage from "../../components/InfoPage";

export default function CorporateSecretarial() {
  return (
    <InfoPage
      title="Corporate Secretarial Services"
      crumb="Corporate Secretarial Services"
      path="/practice-areas/corporate-secretarial"
      tagline="Corporate Secretarial Services"
      image="/assets/images/about/ascolop_about.png"
      paragraphs={[
        "As certified company secretaries, ASCOLP conducts legal compliance, organization and preparation of materials for board meetings, ensuring prompt distribution of agendas, reports, and minutes. We maintain accurate and up-to-date company records, including shareholder registers, minutes of meetings, and legal documentation, and identify, assess and mitigate legal and regulatory risks that the company could face.",
        "We also manage the filing of annual reports, financial statements, and other legal documents with relevant government agencies, and review and draft contracts and agreements, ensuring they align with legal requirements and the company's best interests.",
      ]}
    />
  );
}
