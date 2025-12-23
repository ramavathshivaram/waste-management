import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Truck, User, Clock, Trash2, PackageCheck } from "lucide-react";
import useCollectorStore from "../../stores/collectorStore.js";
import { useCollector } from "../../hooks/use-collertor-query.js";
import Map from "../../components/collector/Map.jsx";
import KpiCard from "../../components/collector/KpiCard.jsx";

const Dashboard = () => {
  const setCollector = useCollectorStore((s) => s.setCollector);

  const { data: collector } = useCollector();

  console.log(collector);

  return (
    <div>
      <div>
        <Map pickups={collector?.stats.pickups} />
      </div>
    </div>
  );
};

export default Dashboard;
