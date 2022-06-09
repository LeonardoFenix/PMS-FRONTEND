import { Box, useTheme, Paper} from "@mui/material";
import React from "react";

import CreateDialog from "./Dialogs/RegisterDialog";

export const MainSettingsBar: React.FC = () => {


    const theme = useTheme();


    return(
       <Box 

        gap={1}
        marginX={1}

        padding={1}
        paddingX={2}
        display="flex"
        alignItems="center"
        height={theme.spacing(5)}
        component={Paper}
        >

         <Box flex={1} display="flex" justifyContent="start">   <CreateDialog/></Box>
      
       </Box>
    );
}