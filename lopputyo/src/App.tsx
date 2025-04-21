import { Routes, Route, Link } from "react-router-dom"
import Button from "@mui/material/Button"
import CustomerList from "./components/CustomerList"
import TrainingList from "./components/TrainingList"

const App = () => {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Button component={Link} to="/customers" variant="contained" color="primary">
          Asiakkaat
        </Button>
        <Button component={Link} to="/trainings" variant="contained" color="primary">
          Harjoitukset
        </Button>
      </nav>
      <Routes>
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/trainings" element={<TrainingList />} />
      </Routes>
    </>
  )
}

export default App