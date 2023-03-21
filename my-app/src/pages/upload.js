import Songform from "@/components/Songform";
import React from "react";
import Nabvar from "@/components/Navbar";

const upload = () => {
  return (
    <div>
      <Nabvar />
      <div className="w-full h-screen pt-20">
        <Songform />
      </div>
    </div>
  );
};

export default upload;
