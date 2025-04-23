import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import { Customer } from "../types";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

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

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchCustomers = () => {
    setCustomers(mockCustomers);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = (params: { data: Customer }) => {
    const confirmDelete = window.confirm(
      `Poistetaanko asiakas ${params.data.firstname} ${params.data.lastname}?`
    );
    if (confirmDelete) {
      setCustomers((prev) => prev.filter((c) => c.id !== params.data.id));
    }
  };

  const columnDefs: ColDef<Customer>[] = [
    {
      field: "firstname",
      headerName: "Etunimi",
      filter: true,
      sortable: true,
      width: 150,
    },
    {
      field: "lastname",
      headerName: "Sukunimi",
      filter: true,
      sortable: true,
      width: 150,
    },
    {
      field: "email",
      headerName: "Sähköposti",
      filter: true,
      sortable: true,
      width: 250,
    },
    {
      headerName: "",
      width: 220,
      cellRenderer: (params: { data: Customer }) => (
        <>
          <EditCustomer data={params.data} setCustomers={setCustomers} />
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(params)}
          >
            Poista
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <AddCustomer customers={customers} setCustomers={setCustomers} />
      <div style={{ width: "90%", height: 500 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
        />
      </div>
    </>
  );
}
