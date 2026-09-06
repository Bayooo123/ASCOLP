import InfoPage from "../components/InfoPage";

export default function About() {
  return (
    <InfoPage
      title="About ASCOLP"
      crumb="About"
      path="/about"
      tagline="about us"
      image="/assets/images/team/abiola-sanni_a.jpg"
      paragraphs={[
        "The Firm [ASCOLP] is a distinguished and leading legal/tax services provider in Nigeria, comprised of dedicated transactional lawyers who are proficient in a wide spectrum of legal services. Our expertise spans through litigation, arbitration, taxation, Property law, Corporate and Commercial Law, Technology Law Practice, serving both local and international clients equally.",
        "With a history of professional achievement and excellence over the years, and a commitment to delivering prompt and effective services to our esteemed clients, our Firm has earned a strong reputation in the legal service community.",
        "Our various accomplishments is attributed to the Principal Partner and Senior Advocate of Nigeria, Professor Abiola O. Sanni, with thirty-three years post-call experience. The Principal Partner has successfully built a team of professionals, well versed in handling complex legal issues across various levels of the Nigerian Judicial System. This extensive experience includes representing clients before esteemed tribunals such as the Investment and Security Tribunal and Tax Appeal Tribunal, culminating in appearances before the Supreme Court.",
        "At ASCOLP, we pride ourselves on our multidisciplinary approach, boasting departments staffed by highly qualified professionals who combine academic prowess with practical experience. Aside from the legal professionals, our administrative and support staff department is equipped with highly skilled staff members. This synergy enables us to deliver meticulous and innovative services, underpinned by exhaustive research and tailored strategies. Our hallmark is a steadfast dedication to offering comprehensive attention to the unique aspects of each case with professionalism, dedication, and commitment to upholding the highest standards of legal practice, thereby delivering bespoke and effective solutions that align with our clients' needs.",
      ]}
    />
  );
}
