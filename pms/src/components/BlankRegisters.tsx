import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
export const BlankRegister: React.FC = () => {
  return (
    <Box flex={1} mt={2} display="flex" justifyContent="center">
      <Box
        flex={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "80vh", backgroundColor: grey[100] }}
      >
        <Grid
          container
          direction={"column"}
          justifyContent="center"
          alignItems="center"
        >
          {" "}
          <Grid item xs={12}>
         Parece que não há registros...
          </Grid>

          <Grid container 
          justifyContent="center"
          alignItems="center">
          <Grid item mt={1} >
          <NoteAddOutlinedIcon style={{ fontSize: 50}}/> 
        </Grid>
        <Grid item >
          {" "}
          Clique para cadastrar um novo cliente.
        </Grid>
         
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
