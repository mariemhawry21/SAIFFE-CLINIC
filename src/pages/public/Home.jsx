import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Home = () => {
  return (
    <div>
      Home
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Choose date" />
      </LocalizationProvider>
    </div>
  );
};

export default Home;
