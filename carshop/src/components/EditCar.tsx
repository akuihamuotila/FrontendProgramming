import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Car, CarData } from "../types";

type EditCarProps = {
  data: CarData;
  fetchCars: () => void;
};

export default function EditCar(props: EditCarProps) {
  const [car, setCar] = useState<Car>({} as Car);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setCar({
      brand: props.data.brand,
      model: props.data.model,
      color: props.data.color,
      fuel: props.data.fuel,
      modelYear: props.data.modelYear,
      price: props.data.price,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    fetch(props.data._links.car.href, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(car),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error when updating a car");

        return response.json();
      })
      .then(() => props.fetchCars())
      .then(() => handleClose())
      .catch((err) => console.error(err));
  };

  return (
    <React.Fragment>
      <Button size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update a car</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            name="brand"
            value={car.brand}
            onChange={(event) => setCar({ ...car, brand: event.target.value })}
            label="Brand"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            name="model"
            value={car.model}
            onChange={(event) => setCar({ ...car, model: event.target.value })}
            label="Model"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            name="color"
            value={car.color}
            onChange={(event) => setCar({ ...car, color: event.target.value })}
            label="Color"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            name="fuel"
            value={car.fuel}
            onChange={(event) => setCar({ ...car, fuel: event.target.value })}
            label="Fuel"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            name="modelYear"
            value={car.modelYear}
            type="number"
            onChange={(event) =>
              setCar({ ...car, modelYear: Number(event.target.value) })
            }
            label="ModelYear"
            fullWidth
            variant="standard"
          />

          <TextField
            required
            margin="dense"
            name="price"
            value={car.price}
            type="number"
            onChange={(event) =>
              setCar({ ...car, price: Number(event.target.value) })
            }
            label="Price (€)"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
