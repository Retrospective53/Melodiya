import Songform from "@/components/Songform";
import React from "react";
import Nabvar from "@/components/Navbar";
import Footer from "@/components/Footer";

const upload = () => {
  return (
    <div>
      <Nabvar />
      <div className="w-full pt-20">
        <Songform />
      </div>
      <Footer />
    </div>
  );
};

export default upload;
