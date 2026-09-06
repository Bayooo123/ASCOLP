import InfoPage from "../components/InfoPage";

export default function CSR() {
  return (
    <InfoPage
      title="Corporate Social Responsibility"
      crumb="Corporate Social Responsibility"
      path="/csr"
      tagline="corporate social responsibility"
      image="/assets/images/about/ascolop_about.png"
      paragraphs={[
        "Every now and again, we identify a good cause and support it with all our resources. We sometimes take up cases ex gratia. It is our way of giving to the society. We understand that without the society we cannot exist.",
      ]}
    />
  );
}
