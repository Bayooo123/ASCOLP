import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function RegulatoryPublicPolicyPage() {
  return (
    <PracticeAreaLayout
      title="Regulatory & Public Policy"
      kicker="Statecraft & Policy Reform"
      headline="Legislative Drafting, Regulatory Compliance & Public Sector Advisory."
      intro="Led by Senior Advocate of Nigeria Prof. Abiola Sanni, our Regulatory & Public Policy group advises sovereign governments, state revenue services, federal ministries, and regulated private sector entities on legislative reform, policy incubation, and administrative rulemaking."
      path="/practice-areas/regulatory-public-policy"
      scenarios={[
        "Public sector MDAs seeking expert review or drafting of primary legislation, executive regulations, or gazetted circulars.",
        "Private corporations seeking strategic counsel to navigate emerging statutory reforms, such as the CETA Bill, Finance Acts, or JRBA 2025.",
        "Regulated operators in lottery, gaming, fintech, or energy seeking licensing advisory and regulatory compliance audits.",
        "Revenue agencies requiring structured executive retreats, capacity building, and institutional rulemaking support.",
      ]}
      whatWeDo={[
        "Legislative & Policy Drafting: Formulating Bills, subsidiary legislation, and administrative guidelines for legislative bodies and MDAs.",
        "Public Sector Capacity Building: Designing and delivering high-level legal training for the Federal Ministry of Finance, FIRS, and State Internal Revenue Services.",
        "Regulatory Risk Assessment: Advising commercial clients on compliance with competition law, sector regulations, and licensing conditions.",
        "Government Interface & Policy Engagement: Structuring constructive, legally sound engagements between industry groups and policymakers.",
      ]}
      expertisePoints={[
        {
          title: "National Tax Policy Framework",
          desc: "Unrivalled institutional authority derived from chairing federal review and implementation committees.",
        },
        {
          title: "Lottery & Gaming Regulation",
          desc: "Extensive counsel on jurisdictional boundaries between federal regulatory bodies and state lottery boards.",
        },
        {
          title: "Administrative Law & Rulemaking",
          desc: "Deep constitutional knowledge of delegated legislation, ultra vires doctrines, and judicial review standards.",
        },
      ]}
      representativeMatters={[
        {
          sector: "Federal Ministry of Finance",
          summary:
            "Chaired the National Tax Policy Review (2016) and Implementation (2017) committees, delivering the master blueprint for Nigeria's annual Finance Acts.",
        },
        {
          sector: "State Revenue Administration",
          summary:
            "Conducted comprehensive legislative review and capacity-building programs for the Kano State Internal Revenue Service and peer revenue bodies.",
        },
        {
          sector: "Gaming & Lottery Regulation",
          summary:
            "Advised key industry operators on constitutional multi-tier taxation and licensing compliance across federal and state jurisdictions.",
        },
      ]}
      lawyers={[
        { name: "Prof. Abiola Sanni (SAN) PhD.", role: "Principal Partner & Head of Policy", slug: "abiola-sanni" },
        { name: "Adebayo Gbadebo", role: "Associate · Public Law & Regulatory", slug: "adebayo-gbadebo" },
      ]}
      leadCounsel={{
        name: "Prof. Abiola Sanni (SAN) PhD.",
        credentials: "Senior Advocate of Nigeria · Former Chair, National Tax Policy Committees",
        slug: "abiola-sanni",
      }}
      relatedKnowledge={[
        {
          title: "Sugar Tax in Nigeria: A Comprehensive Legal Analysis of the CETA Bill 2025",
          slug: "sugar-tax-in-nigeria-legal-analysis",
          author: "Prof. Abiola Sanni (SAN) PhD.",
        },
      ]}
    />
  );
}
