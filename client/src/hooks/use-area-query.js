import {
  getAllAreasUnassignedCollectors,
  getAllAreasUnassignedCentres,
  getAreaById,
} from "../lib/api.js";
import { useQuery } from "@tanstack/react-query";

export const useUnassignedCollectorsAreas = () => {
  return useQuery({
    queryKey: ["unassigned-collectors-areas"],
    queryFn: getAllAreasUnassignedCollectors,
  });
};

export const useUnassignedCentresAreas = () => {
  return useQuery({
    queryKey: ["unassigned-centres-areas"],
    queryFn: getAllAreasUnassignedCentres,
  });
};

export const useAreaById = (id) => {
  return useQuery({
    queryKey: ["area-by-id", id],
    queryFn: () => getAreaById(id),
  });
};
