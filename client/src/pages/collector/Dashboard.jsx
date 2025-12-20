import { useCollector } from "../../hooks/use-collertor-query.js";
import useCollectorStore from "../../stores/collectorStore.js";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);

  const { data, isLoading } = useCollector();

  if (isLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  if (!data) {
    return <div className="p-4">No dashboard data</div>;
  }

  setCollector(data);
  console.log(data)

  return <div className="w-full h-full"></div>;
};

export default Dashboard;
