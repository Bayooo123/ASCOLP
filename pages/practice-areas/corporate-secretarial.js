import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function CorporateSecretarial() {
  return (
    <PracticeAreaLayout
      title="Corporate Secretarial Services"
      kicker="Company Secretary"
      headline="Certified company secretarial services."
      intro="As certified company secretaries, ASCOLP ensures legal compliance across board governance, statutory filings, and corporate record-keeping — identifying, assessing and mitigating the legal and regulatory risk a company could face."
      path="/practice-areas/corporate-secretarial"
      whatWeDo={[
        "Legal compliance, organization, and preparation of materials for board meetings",
        "Prompt distribution of agendas, reports, and minutes",
        "Maintaining accurate shareholder registers, meeting minutes, and legal documentation",
        "Identifying, assessing, and mitigating legal and regulatory risk",
        "Filing annual reports, financial statements, and other documents with relevant government agencies",
        "Reviewing and drafting contracts and agreements aligned with legal requirements and the company's best interests",
      ]}
    />
  );
}
