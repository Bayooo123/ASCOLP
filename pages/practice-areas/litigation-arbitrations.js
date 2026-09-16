import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function LitigationArbitrationsPage() {
  return (
    <PracticeAreaLayout
      title="Litigation & Alternative Dispute Resolution"
      kicker="Dispute Resolution & Trial Advocacy"
      headline="Decisive Appellate Advocacy, Trial Litigation & Commercial Arbitration."
      intro="Our dispute resolution bench represents corporations, financial institutions, and individuals across Magistrate Courts, State and Federal High Courts, the Court of Appeal, and the Supreme Court of Nigeria, as well as domestic and international arbitral tribunals."
      path="/practice-areas/litigation-arbitrations"
      scenarios={[
        "Faced with breach of contract claims, commercial debt recovery, or emergency interlocutory injunction proceedings.",
        "Involved in cross-border or domestic commercial arbitration under ICC, LCIA, or UNCITRAL arbitration rules.",
        "Challenging a trial court ruling on appeal before the Court of Appeal or Supreme Court of Nigeria.",
        "Seeking enforcement or challenge of a foreign arbitral award or judicial judgment within Nigeria.",
      ]}
      whatWeDo={[
        "Commercial & Banking Litigation: Prosecuting and defending complex financial claims, guarantees, and asset recovery actions.",
        "Domestic & International Arbitration: Acting as counsel and party-appointed arbitrators across institutional and ad-hoc arbitrations.",
        "Appellate Practice: Drafting decisive briefs of argument and presenting oral advocacy before the Court of Appeal and Supreme Court.",
        "Maritime & Admiralty Disputes: Vessel arrests, maritime claims, charterparty disputes, and cargo loss claims.",
        "Public Law & Fundamental Rights Litigation: Seeking prerogative writs, judicial review, and constitutional enforcement.",
      ]}
      expertisePoints={[
        {
          title: "Arbitration and Mediation Act 2023",
          desc: "Expert command of Nigeria's modernized arbitration regime, interim measures, and award enforcement.",
        },
        {
          title: "Rules of Superior Courts",
          desc: "Deep procedural familiarity with Federal High Court, Lagos State High Court, Court of Appeal, and Supreme Court rules.",
        },
        {
          title: "Cross-Border Asset Recovery",
          desc: "Coordinating multi-jurisdictional enforcement actions and Mareva injunctions to preserve contested assets.",
        },
      ]}
      representativeMatters={[
        {
          sector: "Aviation & Transportation",
          summary:
            "Successfully defended an international airline in commercial litigation concerning breach of carriage contracts and regulatory fines.",
        },
        {
          sector: "Real Estate & Construction",
          summary:
            "Represented a property development syndicate in an expedited commercial arbitration, resolving a multi-million-dollar developer dispute.",
        },
        {
          sector: "Commercial Banking",
          summary:
            "Represented a commercial banking institution in debt recovery proceedings and enforcement of perfected mortgages across Lagos and Abuja.",
        },
      ]}
      lawyers={[
        { name: "Prof. Abiola Sanni (SAN) PhD.", role: "Senior Advocate of Nigeria", slug: "abiola-sanni" },
        { name: "Kolawole G. Abdulsalam, Esq.", role: "Practice Head · Head of Litigation", slug: "kolawole-abdusalam" },
        { name: "Iniobong Inieke Umoh", role: "Senior Associate · Head of Processes", slug: "iniobong-umoh" },
        { name: "Benjamin Adeyanju", role: "Associate · Litigation & ADR", slug: "benjamin-adeyanju" },
      ]}
      leadCounsel={{
        name: "Kolawole G. Abdulsalam, Esq.",
        credentials: "Practice Head · Over 15 Years Bar Call · Former Head of Chambers, Alade Agbabiaka (SAN) & Co.",
        slug: "kolawole-abdusalam",
      }}
      relatedKnowledge={[
        {
          title: "The Office of the Tax Ombud and the Tax Appeal Tribunal Under JRBA 2025",
          slug: "tax-ombud-and-tax-appeal-tribunal-jrba-2025",
          author: "Prof. Abiola Sanni (SAN) PhD.",
        },
      ]}
    />
  );
}
