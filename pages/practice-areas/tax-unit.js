import InfoPage from "../../components/InfoPage";

export default function TaxUnit() {
  return (
    <InfoPage
      title="Tax Unit"
      crumb="Tax Unit"
      path="/practice-areas/tax-unit"
      tagline="tax unit"
      image="/assets/images/about/ascolp-tax-p.jpg"
      paragraphs={[
        "The unit is headed by Prof. Abiola Sanni who is internationally and locally recognised as a tax expert. He is supported by tax attorneys with experience in a wide range of tax related matters. The Unit is global in its practice, offering both legal and consultancy services to diverse clients in private and public sectors on international and domestic taxation, covering a wide range of regulatory, financing, investment, corporate and commercial issues. Our tax attorneys serve as primary tax advisors and outside general tax counsel to public and private businesses, from start-ups to multinationals, on all tax aspects of their operations in multiple jurisdictions. As international and local tax matters become more complex and sophisticated, the potential for tax controversy increases.",
        "Our primary aim is to channel efforts towards avoiding conflicts by providing well thought out and competent tax advice. We do this by identifying specific transactions that may expose or increase a client's exposure to additional risks, penalties and investigations in the future and providing effective advice to prevent or avoid these risks. We also advise our public and regulatory sector clients on tax laws and administrative matters.",
        "The members of the Unit are also well skilled in and have represented diverse clients in tax arbitrations, litigation and negotiations including interface with government tax authorities.",
      ]}
    />
  );
}
