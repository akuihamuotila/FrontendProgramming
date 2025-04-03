import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  ColDef,
  themeMaterial,
} from "ag-grid-community";
import Button from "@mui/material/Button";
import { ICellRendererParams } from "@ag-grid-community/core";
import Snackbar from "@mui/material/Snackbar";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { Car } from "../types";
import { getCars, deleteCar } from "../carapi";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Carlist() {
  const [cars, setCars] = useState<Car[]>([]);
  const [open, setOpen] = useState(false);

  const [columnDefs] = useState<ColDef<Car>[]>([
    { field: "brand", filter: true, width: 150 },
    { field: "model", filter: true, width: 130 },
    { field: "color", filter: true, width: 130 },
    { field: "fuel", filter: true, width: 120 },
    { field: "modelYear", filter: true, width: 110 },
    { field: "price", filter: true, width: 120 },
    {
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        <EditCar data={params.data} fetchCars={fetchCars} />
      ),
    },
    {
      width: 120,
      cellRenderer: (params: ICellRendererParams) => (
        <Button size="small" color="error" onClick={() => handleDelete(params)}>
          Delete
        </Button>
      ),
    },
  ]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = () => {
    getCars()
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const handleDelete = (params: ICellRendererParams) => {
    if (window.confirm("Are you sure?")) {
      deleteCar(params.data._links.car.href)
        .then(() => fetchCars())
        .then(() => setOpen(true))
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <AddCar fetchCars={fetchCars} />
      <div style={{ width: "90%", height: 500 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          theme={themeMaterial}
        />
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Car deleted successfully"
      />
    </>
  );
}
