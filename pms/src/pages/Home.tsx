import { MainSettingsBar } from "../components/MainSettingsBar";
import { Box } from "@mui/material";
import {Header} from "../components/Header"
import { ClientsTable } from "../components/Table";
export const Home = () => {

    return (
        <Box sx={{ width: "100%" }}>
            <Header/>
         <MainSettingsBar/>

         <ClientsTable/>
        </Box>
      );
}