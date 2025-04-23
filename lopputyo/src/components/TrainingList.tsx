import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import { Training, Customer } from "../types";
import "ag-grid-community/styles/ag-theme-material.css";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import AddTraining from "./AddTraining";

ModuleRegistry.registerModules([AllCommunityModule]);

const mockCustomers: Customer[] = [
  {
    id: 1,
    firstname: "Matti",
    lastname: "Meikäläinen",
    email: "matti@example.com",
  },
  {
    id: 2,
    firstname: "Essi",
    lastname: "Esimerkki",
    email: "essi@example.com",
  },
  {
    id: 3,
    firstname: "Kalle",
    lastname: "Kallela",
    email: "kalle@example.com",
  },
];

const mockTrainings: Training[] = [
  {
    id: 1,
    date: "2025-04-21T12:30",
    activity: "Juoksu",
    duration: 30,
    customer: mockCustomers[0],
  },
  {
    id: 2,
    date: "2025-04-22T14:00",
    activity: "Kuntosali",
    duration: 45,
    customer: mockCustomers[1],
  },
];

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTrainings(mockTrainings);
  }, []);

  const handleDelete = (params: { data: Training }) => {
    if (window.confirm("Poistetaanko harjoitus?")) {
      setTrainings((prev) => prev.filter((t) => t.id !== params.data.id));
      setOpen(true);
    }
  };

  const columnDefs: ColDef<Training>[] = [
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
    {
      headerName: "Toiminnot",
      width: 140,
      cellRenderer: (params: { data: Training }) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params)}
        >
          Poista
        </Button>
      ),
    },
  ];

  return (
    <>
      <AddTraining customers={mockCustomers} setTrainings={setTrainings} />
      <div style={{ width: "90%", height: 500 }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination
          paginationAutoPageSize
          theme={themeMaterial}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Harjoitus poistettu"
      />
    </>
  );
}
