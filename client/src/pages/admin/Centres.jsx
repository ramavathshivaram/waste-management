import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminCentres } from "../../hooks/use-admin-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {Badge} from '@/components/ui/badge'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

const Centres = () => {
  const navigate = useNavigate();
  const { data } = useAdminCentres();

  console.log(data);

  return (
    <div>
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
                {data?.map((centre, idx) => (
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
    </div>
  );
};

export default Centres;
