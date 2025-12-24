import { useCollector } from "../../hooks/use-collertor-query.js";
import Map from "../../components/collector/Map.jsx";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useCollector();

  if (isLoading) return <div>Loading...</div>;

  const persecent = Math.round(
    (data.pickups?.completed / data.pickups?.total) * 100 || 50 //TODO change it to 0
  );

  return (
    <div className="p-2 grid grid-rows-[100px_1fr] h-full">
      <div className="h-full flex items-center gap-5">
        <div className="flex-1">
          <div className="border border-dashed h-10 rounded-2xl p-0.5 w-full bg-neutral-900">
            <div
              style={{
                width: `${persecent}%`,
              }}
              className="border bg-green-600/30 border-green-700 h-full rounded-2xl"
            />
          </div>
        </div>
        <Button size="sm" onClick={() => navigate(`/collector/map`)}>
          Start
        </Button>
      </div>

      <Map route={data.route} pickups={data.pending} />
    </div>
  );
};

export default Dashboard;
