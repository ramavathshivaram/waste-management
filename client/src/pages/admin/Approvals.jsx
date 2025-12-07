import React, { useState } from "react";
import { useAdminApprovals } from "../../hooks/use-admin-query";
import { useNavigate } from "react-router-dom";

// ShadCN UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const Approvals = () => {
  const navigate = useNavigate();
  const [isCollectorVisible, setIsCollectorVisible] = useState(true);
  const { data } = useAdminApprovals();

  if (!data) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-2 space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Pending Collectors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.collectors?.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Pending Centres</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.centres?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Toggle Buttons */}
      <div className="flex gap-3">
        <Button
          variant={isCollectorVisible ? "default" : "outline"}
          onClick={() => setIsCollectorVisible(true)}
        >
          Collectors
        </Button>

        <Button
          variant={!isCollectorVisible ? "default" : "outline"}
          onClick={() => setIsCollectorVisible(false)}
        >
          Centres
        </Button>
      </div>

      {/* CONDITIONAL RENDER */}
      {isCollectorVisible ? (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Collectors</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 rounded-md border p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>License Number</TableHead>
                    <TableHead>Vehicle Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.collectors?.map((collector, idx) => (
                    <TableRow
                      key={collector._id}
                      onClick={() => {
                        navigate(`/admin/collector?id=${collector._id}`);
                      }}
                    >
                      <TableCell>{idx + 1}</TableCell>

                      <TableCell>
                        {collector.licenseNumber || (
                          <Badge variant="destructive">No License</Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        {collector.vehicle?.type || <Badge>No Vehicle</Badge>}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant={
                            collector.status === "inactive"
                              ? "outline"
                              : "default"
                          }
                        >
                          {collector.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Centres</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 rounded-md border p-3">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Waste Types</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.centres?.map((centre, idx) => (
                    <TableRow
                      key={centre._id}
                      onClick={() => {
                        navigate(`/admin/centre?id=${centre._id}`);
                      }}
                    >
                      <TableCell>{idx + 1}</TableCell>

                      <TableCell>{centre.name || "No Name"}</TableCell>

                      <TableCell>
                        {centre.acceptedWasteTypes?.length > 0 ? (
                          centre.acceptedWasteTypes.join(", ")
                        ) : (
                          <Badge>No Types</Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge variant="outline">{centre.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Approvals;
