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

  const [columnDefs] = useState<ColDef<Customer>[]>([
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
  ]);

  useEffect(() => {
    setCustomers(mockCustomers);
  }, []);

  return (
    <div style={{ width: "90%", height: 500 }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationAutoPageSize={true}
        theme={themeMaterial}
      />
    </div>
  );
}
