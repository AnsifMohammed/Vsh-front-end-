import Consultation from "./components/Consultation";
import HealthCalculator from "./components/HealthCalculator";
import HealthcareJourney from "./components/HealthcareJaourney";
import HealthcareServices from "./components/HealthcareServices";
import HeroSection from "./components/HeroSection";
import MapSection from "./components/MapSection";
import PatientStories from "./components/PatientStories";
import SpecialistDoctors from "./components/SpecialistDoctors";
import StatsBanner from "./components/Stasbanner";
import StatsCard from "./components/StatsCard";
import { useState } from "react";

function HomePage() {
  const [selectedPath, setSelectedPath] = useState(null);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <StatsCard />
      <HealthCalculator />
      <HealthcareJourney selectedPath={selectedPath} onSelectPath={setSelectedPath} />
      <HealthcareServices selectedFilter={selectedPath} />
      <SpecialistDoctors />
      <StatsBanner />
      <PatientStories />
      <Consultation />
      <MapSection />
    </div>
  );
}

export default HomePage;