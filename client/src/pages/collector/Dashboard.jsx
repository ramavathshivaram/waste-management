import React from "react";
import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);
  const { data } = useCollector();

  if (data) {
    setCollector(data);
  }
  return (
    <div>
      // btn for activate and deactivate (offline and online)
      <br />
      //map with all the pickups with best routes
      <br />
      // on start continue with first pickup (navigate to pickup details - map +
      route)
      <br />
    </div>
  );
};

export default Dashboard;
