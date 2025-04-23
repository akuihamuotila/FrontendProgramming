import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Customer } from "../types";

type Props = {
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  fetchCustomers?: () => void;
};

export default function AddCustomer({ customers, setCustomers }: Props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newId = Math.max(0, ...customers.map((c) => c.id)) + 1;
    setCustomers([...customers, { ...customer, id: newId }]);
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Lisää asiakas
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Uusi asiakas</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Etunimi"
            name="firstname"
            fullWidth
            value={customer.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sukunimi"
            name="lastname"
            fullWidth
            value={customer.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sähköposti"
            name="email"
            fullWidth
            value={customer.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Peruuta</Button>
          <Button onClick={handleSave} variant="contained">
            Tallenna
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
