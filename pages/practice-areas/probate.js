import InfoPage from "../../components/InfoPage";

export default function Probate() {
  return (
    <InfoPage
      title="Probate Services"
      crumb="Probate Services"
      path="/practice-areas/probate"
      tagline="Probate Services"
      image="/assets/images/about/ascolop_about.png"
      paragraphs={[
        "As probate officer, ASCOLP handles documentation and filing of your probate process for both Testate and Intestate clients, including reading of the will, marking of the will, death certificate, relevant financial records, Court processes, asset identification, estate distribution, conflict resolution and estate management.",
      ]}
    />
  );
}
