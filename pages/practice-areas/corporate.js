import InfoPage from "../../components/InfoPage";

export default function Corporate() {
  return (
    <InfoPage
      title="Corporate & Commercial Practice"
      crumb="Corporate & Commercial Practice"
      path="/practice-areas/corporate"
      tagline="corporate & commercial practice"
      image="/assets/images/about/corporate.jpg"
      paragraphs={[
        "Our professional outlook, centered on client satisfaction, highly influences our approach to clients' needs. We deal with every assignment with the primary purpose of establishing an enduring relationship with our clients. You are assured of a cohesive team made up of the best hands, who combine extensive experience with the necessary skill to deal with any legal challenge with the aim of providing “cutting edge” practical solutions to every legal assignment.",
        "The Firm is a specialized business law practice comprising multi-faceted groups/departments with expertise and quality experience in diverse areas of law.",
        "We have created two broad departments and a tax unit — the Litigation Department, the Corporate & Commercial Practice Department, and the Tax Unit — each manned by highly efficient, skilful and experienced lawyers whose only passion is quality service delivery and client satisfaction.",
      ]}
    />
  );
}
