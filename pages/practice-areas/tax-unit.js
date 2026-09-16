import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function TaxUnitPage() {
  return (
    <PracticeAreaLayout
      title="Tax Practice & Advisory"
      kicker="Specialist Fiscal Counsel"
      headline="Preventive Tax Advisory, Dispute Resolution & Fiscal Controversy."
      intro="Headed by Senior Advocate of Nigeria Prof. Abiola Sanni and backed by dedicated tax counsel, the Tax Practice advises multinational enterprises, financial institutions, and fast-growing businesses on navigating complex Nigerian and cross-border fiscal frameworks."
      path="/practice-areas/tax-unit"
      scenarios={[
        "Received a formal audit assessment, notice of demand, or penalty determination from the Federal Inland Revenue Service (FIRS) or State Internal Revenue Service (SIRS).",
        "Seeking advance certainty and statutory risk mitigation on the tax structuring of a major acquisition, restructuring, or joint venture.",
        "Facing a transfer pricing inquiry, customs tariff reassessment, or excise dispute under CETA and regional trade pacts.",
        "Requiring seasoned trial advocacy before the Tax Appeal Tribunal (TAT) or superior courts of record.",
      ]}
      whatWeDo={[
        "Tax Controversy & Appellate Litigation: Representation before the Tax Appeal Tribunal, Federal High Court, Court of Appeal, and Supreme Court.",
        "Preventive Tax Structuring: Evaluating prospective transactions to mitigate exposure to tax investigations, statutory interest, and penalties.",
        "Transfer Pricing & Cross-Border Advisory: Structuring compliant inter-company transactions and defending transfer pricing documentation.",
        "Customs, Excise & Indirect Tax Counsel: Advisory on CETA compliance, ad valorem sugar excise levies, VAT administration, and stamp duties.",
        "Public Sector & Institutional Consulting: Advising ministries, departments, and revenue agencies on tax policy review, drafting, and administration.",
      ]}
      expertisePoints={[
        {
          title: "Customs & Excise (CETA)",
          desc: "Deep statutory knowledge of the Customs, Excise Tariff, Etc. (Consolidation) Act and subsequent Finance Acts.",
        },
        {
          title: "Company Income Tax & VAT",
          desc: "Complex corporate taxation, capital allowances, withholding tax regimes, and indirect tax optimization.",
        },
        {
          title: "Tax Appeal Tribunal Rules",
          desc: "Seasoned procedural experience navigating all zonal tribunals across Lagos, Abuja, and regional centers.",
        },
        {
          title: "National Tax Policy Implementation",
          desc: "Unmatched insight into legislative intent, regulatory rulemaking, and administrative reform.",
        },
      ]}
      representativeMatters={[
        {
          sector: "Fast-Moving Consumer Goods",
          summary:
            "Advised a leading beverage conglomerate on excise exposure arising from proposed ad valorem sugar taxation under CETA Bill amendments.",
        },
        {
          sector: "Oil & Gas Services",
          summary:
            "Represented an indigenous engineering and oil services provider before the Tax Appeal Tribunal in a disputed ₦4.2B withholding tax assessment.",
        },
        {
          sector: "Financial Services",
          summary:
            "Structured the stamp duty and capital gains tax framework for a complex inter-group corporate restructuring involving multiple regulated operating entities.",
        },
      ]}
      lawyers={[
        { name: "Prof. Abiola Sanni (SAN) PhD.", role: "Principal Partner & Head of Practice", slug: "abiola-sanni" },
        { name: "Kolawole G. Abdulsalam, Esq.", role: "Practice Head · Litigation & Tax", slug: "kolawole-abdusalam" },
        { name: "Iniobong Inieke Umoh", role: "Senior Associate", slug: "iniobong-umoh" },
        { name: "Maureen C. R. Omaegbu", role: "Associate · ACArb", slug: "maureen-omaegbu" },
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
        {
          title: "The Office of the Tax Ombud and the Tax Appeal Tribunal Under JRBA 2025",
          slug: "tax-ombud-and-tax-appeal-tribunal-jrba-2025",
          author: "Prof. Abiola Sanni (SAN) PhD.",
        },
      ]}
    />
  );
}
