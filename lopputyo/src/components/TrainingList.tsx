import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import { Training } from "../types";
import "ag-grid-community/styles/ag-theme-material.css";

ModuleRegistry.registerModules([AllCommunityModule]);

const mockTrainings: Training[] = [
  {
    id: 1,
    date: "2025-04-21T12:30",
    activity: "Juoksu",
    duration: 30,
    customer: { firstname: "Matti", lastname: "Meikäläinen" },
  },
  {
    id: 2,
    date: "2025-04-22T14:00",
    activity: "Kuntosali",
    duration: 45,
    customer: { firstname: "Essi", lastname: "Esimerkki" },
  },
];

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);

  const [columnDefs] = useState<ColDef<Training>[]>([
    {
      field: "date",
      headerName: "Päivämäärä",
      filter: true,
      sortable: true,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("fi-FI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      width: 200,
    },
    {
      field: "activity",
      headerName: "Harjoitus",
      filter: true,
      sortable: true,
      width: 160,
    },
    {
      field: "duration",
      headerName: "Kesto (min)",
      filter: true,
      sortable: true,
      width: 130,
    },
    {
      headerName: "Asiakas",
      valueGetter: (params) =>
        `${params.data?.customer?.firstname ?? ""} ${
          params.data?.customer?.lastname ?? ""
        }`,
      sortable: true,
      filter: true,
      width: 200,
    },
  ]);

  useEffect(() => {
    setTrainings(mockTrainings);
  }, []);

  return (
    <div style={{ width: "90%", height: 500 }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        theme={themeMaterial}
      />
    </div>
  );
}
