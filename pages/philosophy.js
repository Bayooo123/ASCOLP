import InfoPage from "../components/InfoPage";

export default function Philosophy() {
  return (
    <InfoPage
      title="Our Philosophy"
      path="/philosophy"
      tagline="our philosophy"
      image="/assets/images/about/ascolop_about.png"
      paragraphs={[
        "We deal with every assignment with the primary purpose of establishing enduring relationship with our clients. Our trademark approach is to give detailed attention to issues employing extensive experience with necessary skills to deal “cutting edge” solutions to legal challenges.",
      ]}
    />
  );
}
