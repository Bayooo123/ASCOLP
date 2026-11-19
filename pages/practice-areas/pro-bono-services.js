import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function ProBonoServices() {
  return (
    <PracticeAreaLayout
      title="Pro Bono Services"
      kicker="Access to Justice"
      headline="Access to justice, for those who need it most."
      intro="For over 35 years, ASCOLP has been committed to extending access to justice beyond our paying clientele — from indigent individuals navigating family, property and criminal matters, to small businesses and community organisations in need of corporate, regulatory or dispute resolution support."
      path="/practice-areas/pro-bono-services"
      whatWeDo={[
        "Litigation and alternative dispute resolution for indigent individuals and community organisations facing financial hardship.",
        "Corporate advisory and regulatory support for small businesses and community organisations unable to afford full-fee representation.",
        "Tax matters handled on a pro bono or subsidized-fee basis, reflecting the full breadth of the Firm's expertise.",
      ]}
    />
  );
}
