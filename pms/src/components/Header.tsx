import { Box,Divider,Grid } from "@mui/material";
import React from "react";
import logo from "../assets/philips-logo.png";


export const Header: React.FC = () => {


  return (
    <>
    <Box flex={1} display="flex" justifyContent="start">
      <Grid container spacing={2}>
        {" "}
        <Grid item mt={1} ml={3}>
          <img src={logo} alt="Logo" height="80rem" />
        </Grid>
        <Grid item mt={5}>
          {" "}
          Philips Manager System
   
        </Grid>
      
      </Grid>
      
    </Box>
    <Divider />
    </>
  );
};
