import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { Training, Customer } from "../types";

type Props = {
  customers: Customer[];
  setTrainings: React.Dispatch<React.SetStateAction<Training[]>>;
};

export default function AddTraining({ customers, setTrainings }: Props) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleSave = () => {
    if (!date || !activity || !duration || !selectedCustomer) return;

    const newTraining: Training = {
      id: Date.now(),
      date: date.toISOString(),
      activity,
      duration: Number(duration),
      customer: selectedCustomer,
    };

    setTrainings((prev) => [...prev, newTraining]);
    setOpen(false);
    setActivity("");
    setDuration("");
    setDate(dayjs());
    setSelectedCustomer(null);
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Lisää harjoitus
      </Button>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Uusi harjoitus</DialogTitle>
          <DialogContent>
            <DateTimePicker
              label="Päivämäärä ja aika"
              value={date}
              onChange={(value) => setDate(value)}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />
            <TextField
              label="Harjoitus"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Kesto (min)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              fullWidth
              margin="normal"
              type="number"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="customer-label">Asiakas</InputLabel>
              <Select
                labelId="customer-label"
                value={selectedCustomer?.id || ""}
                onChange={(e) => {
                  const customer = customers.find(
                    (c) => c.id === Number(e.target.value)
                  );
                  setSelectedCustomer(customer || null);
                }}
                label="Asiakas"
              >
                {customers.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.firstname} {c.lastname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Peruuta</Button>
            <Button variant="contained" onClick={handleSave}>
              Tallenna
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </>
  );
}
