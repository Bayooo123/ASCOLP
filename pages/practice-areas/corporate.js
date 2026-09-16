import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function CorporatePage() {
  return (
    <PracticeAreaLayout
      title="Corporate & Commercial Practice"
      kicker="Commercial Advisory"
      headline="Strategic Transaction Structuring, Corporate Governance & M&A."
      intro="Our Corporate & Commercial practice advises indigenous enterprises, multinationals, and investment groups on navigating complex transaction lifecycles, corporate compliance, and commercial contract negotiations under Nigerian company law."
      path="/practice-areas/corporate"
      scenarios={[
        "Structuring or negotiating a joint venture, cross-border equity participation, or merger under CAMA 2020.",
        "Conducting vendor or buyer legal due diligence on target corporate assets or commercial real estate.",
        "Drafting complex commercial agreements, distributor contracts, technology transfer pacts, or licensing arrangements.",
        "Resolving deadlock, shareholder dissension, or corporate governance vulnerabilities at board level.",
      ]}
      whatWeDo={[
        "Mergers, Acquisitions & Joint Ventures: End-to-end legal support from initial term sheet negotiation through due diligence, SEC filings, and post-closing integration.",
        "Commercial Contracts & Risk Allocation: Drafting and negotiating supply contracts, service level agreements, EPC contracts, and agency structures.",
        "Board Governance & Regulatory Compliance: Ensuring adherence to corporate governance codes, statutory reporting, and annual filings with regulatory bodies.",
        "Insolvency & Corporate Restructuring: Advising creditors, directors, and court-appointed receivers on debt restructuring, schemes of arrangement, and liquidation.",
      ]}
      expertisePoints={[
        {
          title: "Companies and Allied Matters Act (CAMA 2020)",
          desc: "Unmatched familiarity with statutory company administration, minority protections, and share issuance rules.",
        },
        {
          title: "Investments and Securities Act (ISA)",
          desc: "Navigating capital market rules, private placements, and corporate securities transactions.",
        },
        {
          title: "Regulatory Licensing & Approvals",
          desc: "Interfacing with the Corporate Affairs Commission (CAC), NOTAP, NIPC, and industry-specific regulators.",
        },
      ]}
      representativeMatters={[
        {
          sector: "Manufacturing & Distribution",
          summary:
            "Advised an international consumer products manufacturer on the legal restructuring of its Nigerian distribution and supply chain network.",
        },
        {
          sector: "Financial Technology",
          summary:
            "Drafted regulatory compliance architecture, merchant agreements, and shareholder documentation for an emerging African fintech entity.",
        },
        {
          sector: "Infrastructure & Logistics",
          summary:
            "Structured a ₦2.8B multi-party joint venture agreement for a dry port and logistics hub in South-Western Nigeria.",
        },
      ]}
      lawyers={[
        { name: "Kolawole G. Abdulsalam, Esq.", role: "Practice Head · Corporate & Litigation", slug: "kolawole-abdusalam" },
        { name: "Iniobong Inieke Umoh", role: "Senior Associate", slug: "iniobong-umoh" },
        { name: "Adebayo Gbadebo", role: "Associate · Corporate Advisory", slug: "adebayo-gbadebo" },
      ]}
      leadCounsel={{
        name: "Kolawole G. Abdulsalam, Esq.",
        credentials: "Practice Head · Former Head of Chambers, Alade Agbabiaka (SAN) & Co.",
        slug: "kolawole-abdusalam",
      }}
      relatedKnowledge={[
        {
          title: "Sugar Tax in Nigeria: A Comprehensive Legal Analysis",
          slug: "sugar-tax-in-nigeria-legal-analysis",
          author: "Prof. Abiola Sanni (SAN) PhD.",
        },
      ]}
    />
  );
}
