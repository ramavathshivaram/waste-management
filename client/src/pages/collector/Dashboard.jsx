import { useCollector } from "../../hooks/use-collertor-query.js";
import Map from "../../components/collector/Map.jsx";

const Dashboard = () => {
  const { data: collector } = useCollector();

  console.log(collector);

  return (
    <div className="p-2 grid grid-rows-[100px_1fr] h-full">
      <div className="h-full">progress</div>

      <Map routes />
    </div>
  );
};

export default Dashboard;
