import PracticeAreaLayout from "../../components/PracticeAreaLayout";

export default function Probate() {
  return (
    <PracticeAreaLayout
      title="Probate Services"
      kicker="Private Client"
      headline="Probate & Estate Administration."
      intro="As probate officer, ASCOLP handles the documentation and filing of the probate process for both testate and intestate clients, from the reading of the will through to final estate distribution."
      path="/practice-areas/probate"
      whatWeDo={[
        "Reading and marking of the will",
        "Securing the death certificate and relevant financial records",
        "Court processes and asset identification",
        "Estate distribution and conflict resolution",
        "Ongoing estate management",
      ]}
    />
  );
}
