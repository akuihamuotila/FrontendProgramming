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
  data: Customer;
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
};

export default function EditCustomer({ data, setCustomers }: Props) {
  const [open, setOpen] = useState(false);
  const [edited, setEdited] = useState<Customer>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setCustomers((prev) => prev.map((c) => (c.id === edited.id ? edited : c)));
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={() => setOpen(true)}
        sx={{ mr: 1 }}
      >
        Muokkaa
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Muokkaa asiakasta</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Etunimi"
            name="firstname"
            fullWidth
            value={edited.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sukunimi"
            name="lastname"
            fullWidth
            value={edited.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Sähköposti"
            name="email"
            fullWidth
            value={edited.email}
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
