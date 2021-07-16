import React from "react";
import ComingSoon from "./ComingSoon";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div data-aos="fade-left">
      <ComingSoon pageName={"Dashboard"} />

      <Footer />
    </div>
  );
};

export default Dashboard;
