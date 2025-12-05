import React from "react";
import useUserStore from "../../stores/useUserStore";

const Report = () => {
  const user = useUserStore((s) => s.user);

  return <div>Report Report</div>;
};

export default Report;
