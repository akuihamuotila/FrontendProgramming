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
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import AddTraining from "./AddTraining";
import { getTrainings, addTraining, deleteTraining } from "../api/trainingapi";
import { getCustomers } from "../api/customerapi";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function TrainingList() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchTrainings();
    fetchCustomers();
  }, []);

  const fetchTrainings = async () => {
    try {
      const data = await getTrainings();
      setTrainings(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (training: Training) => {
    try {
      await addTraining(training);
      fetchTrainings();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (url: string) => {
    if (window.confirm("Poistetaanko harjoitus?")) {
      try {
        await deleteTraining(url);
        fetchTrainings();
        setOpen(true);
      } catch (error) {
        console.error(error);
      }
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
      valueGetter: (params) => {
        // Tarkistetaan ensin, onko asiakastieto saatavilla
        const customerHref = params.data?.customer?._links?.customer?.href;

        if (!customerHref) {
          console.log("Asiakastieto puuttuu, href ei löytynyt"); // Debugging
          return "Tuntematon1"; // Jos ei löydy asiakkaan href
        }

        // Etsi asiakas href:n perusteella
        const customer = customers.find((c) => {
          console.log(
            "Etsitään asiakasta href:n perusteella",
            c._links?.customer?.href
          ); // Debugging
          return c._links?.customer?.href === customerHref;
        });

        // Jos asiakas löytyy, näytä nimi
        if (customer) {
          console.log("Asiakas löytyi:", customer.firstname, customer.lastname); // Debugging
          return `${customer.firstname} ${customer.lastname}`; // Yhdistetään etunimi ja sukunimi
        } else {
          console.log("Asiakasta ei löytynyt"); // Debugging
          return "Tuntematon2"; // Jos asiakasta ei löydy
        }
      },
      sortable: true,
      filter: true,
      width: 200,
    },
    {
      headerName: "Poista",
      width: 140,
      cellRenderer: (params: { data: Training }) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() =>
            params.data._links?.self?.href &&
            handleDelete(params.data._links.self.href)
          }
        >
          Poista
        </Button>
      ),
    },
  ];

  return (
    <>
      <AddTraining customers={customers} onSave={handleAdd} />
      <div style={{ width: "100%", height: 600 }}>
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
