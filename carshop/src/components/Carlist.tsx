import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);


type Car = {
    brand: string;
    model: string;
    color: string;
    fuel: string;
    modelYear: number;
    price: number;
};

export default function Carlist() {
    const [cars, setCars] = useState<Car[]>([]);

    const [columnDefs] = useState<ColDef<Car>[]>([
        { field: "brand" },
        { field: "model" },
        { field: "color" },
        { field: "fuel", filter: true, width: 150 },
        { field: "modelYear", filter: true, width: 120 },
        { field: "price", filter : true, width: 120 },
    ]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = () => {
        fetch("https://car-rest-service-carshop.2.rahtiapp.fi/cars")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching cars");

            return response.json();
        })
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.error(err));
    };

    return (
        <>
            <div style={{ width: 1000, height: 500, }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={10}
                />
            </div>
        </>
    ); 
}