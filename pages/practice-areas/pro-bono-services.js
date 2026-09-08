import InfoPage from "../../components/InfoPage";

export default function ProBonoServices() {
  return (
    <InfoPage
      title="Pro Bono Services"
      crumb="Pro Bono Services"
      path="/practice-areas/pro-bono-services"
      tagline="Pro Bono Services"
      image="/assets/images/about/ascolop_about.png"
      paragraphs={[
        "For over 35 years, ASCOLP has been committed to extending access to justice beyond our paying clientele. We regularly take on pro bono and subsidized-fee engagements for individuals and organisations facing financial hardship who would otherwise be unable to afford quality legal representation — from indigent individuals navigating family, property and criminal matters, to small businesses and community organisations in need of corporate, regulatory or dispute resolution support.",
        "Our pro bono practice spans litigation and alternative dispute resolution, corporate advisory, and tax matters, reflecting the full breadth of the Firm's expertise. We believe a truly distinguished legal practice measures itself not only by the value it delivers to paying clients, but by the difference it makes for those who need it most — a conviction that continues to guide how we give our time, expertise and resources back to the community we serve.",
      ]}
    />
  );
}
