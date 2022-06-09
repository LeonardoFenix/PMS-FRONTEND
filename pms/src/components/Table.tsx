import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpdateDialog from "./Dialogs/UpdateDialog";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box } from "@mui/material";
import { useClient } from "../services/useClient";
import moment from "moment";
import { BlankRegister } from "./BlankRegisters";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const ClientsTable: React.FC = () => {
  const { clients, getClients, deleteClient, createClient } = useClient();

  React.useEffect(() => {
    getClients();
  }, [getClients, createClient]);

  return (
    <>
      {clients.length ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Nome</StyledTableCell>
                <StyledTableCell align="center">CPF</StyledTableCell>
                <StyledTableCell align="center">
                  Data de nascimento
                </StyledTableCell>
                <StyledTableCell align="center">Endereços</StyledTableCell>
                <StyledTableCell align="center">Opções</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">{row.cpf}</StyledTableCell>
                  <StyledTableCell align="center">
                    {moment(row.birthDate).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.address}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box sx={{ display: "inline-flex" }}>
                      <UpdateDialog 
                              id={row.id}
                              name={row.name}
                              cpf={row.cpf}
                              birthDate={row.birthDate}
                              address={row.address}
                      />

                      <Button
                        onClick={() => deleteClient(row.id)}
                        sx={{ marginLeft: 2 }}
                        size="small"
                        variant="contained"
                        color="error"
                        endIcon={<DeleteOutlineOutlinedIcon />}
                      >
                        Excluir
                      </Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <BlankRegister />
      )}
    </>
  );
};
