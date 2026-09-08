import InfoPage from "../../components/InfoPage";

export default function LitigationArbitrations() {
  return (
    <InfoPage
      title="Litigation & Alternative Dispute Resolution"
      crumb="Litigation & Alternative Dispute Resolution"
      path="/practice-areas/litigation-arbitrations"
      tagline="Litigation & Alternative Dispute Resolution"
      image="/assets/images/about/ascolp-bg-p.jpg"
      paragraphs={[
        "Our Litigation and Alternative Dispute Resolution practice offers comprehensive legal representation and strategic guidance to clients embroiled in disputes and conflicts. We understand the complex and dynamic nature of resolving legal conflicts, whether through traditional litigation in courts or alternative methods such as arbitration and mediation.",
        "Our team of experienced legal experts combines deep legal expertise with a pragmatic approach to achieve the best possible outcomes for our clients.",
      ]}
    >
      <p className="work-together-tow__text-2">
        Consistent with the Firm's longstanding commitment to access to justice, our Litigation and Alternative
        Dispute Resolution team regularly takes on pro bono and subsidized-fee matters for clients facing financial
        hardship. Read more about our <a href="/practice-areas/pro-bono-services">Pro Bono Services</a>.
      </p>
    </InfoPage>
  );
}
