import { useCollector } from "../../hooks/use-collertor-query.js";
import Map from "../../components/collector/Map.jsx";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCollector();

  if (isLoading) return <div>Loading...</div>;

  const total = data.pickups?.total ?? 0;
  const completed = data.pickups?.completed ?? 0;

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const pendingPercent = 100 - percent;

  return (
    <div className="p-2 grid grid-rows-[100px_1fr] h-full">
      {/* TOP BAR */}
      <div className="flex items-center h-full gap-5">
        <div className="flex-1">
          <div className="border border-dashed h-10 rounded-2xl p-0.5 w-full bg-neutral-900 flex overflow-hidden">
            {/* Completed */}
            <div
              style={{ width: `${percent}%` }}
              className="flex items-center justify-center h-full text-green-500 border border-green-700 bg-green-600/30 rounded-2xl transition-all"
            >
              {percent > 0 && "Completed"}
            </div>

            {/* Pending */}
            <div
              style={{ width: `${pendingPercent}%` }}
              className="flex items-center justify-center h-full text-red-500 transition-all"
            >
              {pendingPercent > 0 && "Pending"}
            </div>
          </div>
        </div>

        <Button size="sm" onClick={() => navigate(`/collector/map`)}>
          Start
        </Button>
      </div>

      {/* MAP */}
      <Map route={data.route?.path || []} />
    </div>
  );
};

export default Dashboard;
