import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { IClient } from "../../interfaces";
import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { v4 as uuidv4 } from "uuid";
import { useClient } from "../../services/useClient";
import { Notifier } from "../Notifier";

export default function CreateDialog() {
  const [nameValue, setNameValue] = React.useState<string>("");
  const [error, setError] = React.useState<Boolean>(false);
  const [success, setSuccess] = React.useState<Boolean>(false);
  const [validate, setValidate] = React.useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [successMessage, setSuccessMessage] = React.useState<string>("");
  const [cpfValue, setCPFValue] = React.useState<string>("");
  const [value, setValue] = React.useState<Date | null>(null);
  const onNameChange = (e: any) => setNameValue(e.target.value);
  const onCPFChange = (e: any) => setCPFValue(e.target.value);
  const handleSubmit = async () => {
    let addressArray = addressCollection[0].address.map((item) => {
      return item.address;
    });
    const client: IClient = {
      id: Math.floor(Math.random() * 90000) + 10000,
      name: nameValue,
      cpf: cpfValue,
      birthDate: value,
      address: addressArray,
    };
    const res = await createClient(client);

    if (res.success) {
      handleClose();

      window.location.reload();
      setSuccessMessage(res.message);
      setSuccess(true);
    } else {
      setErrorMessage(res.message);
      setError(true);
    }
  };
  function handleReset() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    setNameValue(""),
      setCPFValue(""),
      setValue(null),
      setAddressCollection([
        {
          id: uuidv4(),
          address: [
            {
              id: uuidv4(),
              address: [],
            },
          ],
        },
      ]);
  }
  const [hasOneRow, setHasOneRow] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const { createClient } = useClient();
  const [addressCollection, setAddressCollection] = React.useState([
    {
      id: uuidv4(),
      address: [
        {
          id: uuidv4(),
          address: [],
        },
      ],
    },
  ]);

  const removeAdressRow = (id: string) => {
    const _addressCollection = [...addressCollection];
    const index = addressCollection.findIndex((address) => address.id === id);
    _addressCollection[index].address.pop();
    setAddressCollection(_addressCollection);
    if (addressCollection[0].address.length === 1) {
      setHasOneRow(true);
    }
  };

  const addNewAddress = (id: string) => {
    const index = addressCollection.findIndex((address) => address.id === id);
    let _addressCollection = [...addressCollection];
    _addressCollection[index].address.push({
      id: uuidv4(),
      address: [],
    });
    setAddressCollection(_addressCollection);
    setHasOneRow(false);
    validateFields()
  };

  const handleAddressData = (
    addressId: string,
    locId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const addressIndex = addressCollection.findIndex(
      (address) => address.id === addressId
    );
    let _addressCollection = [...addressCollection] as any;
    const locIndex = addressCollection[addressIndex].address.findIndex(
      (m) => m.id === locId
    );
    _addressCollection[addressIndex].address[locIndex][event.target.name] =
      event.target.value;
    setAddressCollection(_addressCollection);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValidate(false);
    handleReset();
  };

  function validateFields() {
    if (nameValue && cpfValue && value && addressCollection[0].address) {
      setValidate(true);
    }
  }
  return (
    <>
      <Notifier
        open={error ? true : false}
        severity="error"
        handleClose={() => setError(false)}
        directions={{ horizontal: "left", vertical: "bottom" }}
      >
        {errorMessage}
      </Notifier>
      <Notifier
        open={success ? true : false}
        severity="success"
        handleClose={() => setError(false)}
        directions={{ horizontal: "left", vertical: "bottom" }}
      >
        {successMessage}
      </Notifier>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
        endIcon={<AddIcon />}
      >
        {" "}
        Novo{" "}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>Cadastro de Clientes</DialogTitle>
        <Divider variant="middle" />
        <DialogContent>
          <Paper sx={{ padding: 2 }}>
            <Grid container>
              <Grid item xs={12} mb={2}>
                <TextField
                  size={"small"}
                  onBlur={validateFields}
                  onChange={onNameChange}
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  value={nameValue}
                  fullWidth
                  label={"Nome:"} 
                />
              </Grid>
              <Grid item xs={5.5}>
                <TextField
                  fullWidth
                  InputLabelProps={{
                    style: { fontSize: 14 },
                  }}
                  size={"small"}
                  onBlur={validateFields}
                  onChange={onCPFChange}
                  value={cpfValue}
                  label={"CPF:"} 
                />
              </Grid>
              <Grid item xs={0.5}></Grid>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Data de nascimento"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
                        onBlur={validateFields}
                        InputLabelProps={{
                          style: { fontSize: 14 },
                        }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                {" "}
                <Box>
                  <Box>
                    {addressCollection.map((item) => (
                      <Box key={item.id}>
                        <Box sx={{ marginTop: 2 }}>
                          <Typography>Endereços: </Typography>
                          <Divider variant="middle" sx={{ marginBottom: 2 }} />
                          {item.address.map((loc) => (
                            <Box key={loc.id}>
                              <TextField
                                onBlur={validateFields}
                                name="address"
                                fullWidth
                                InputLabelProps={{
                                  style: { fontSize: 14 },
                                }}
                                size={"small"}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => handleAddressData(item.id, loc.id, e)}
                                label={"Rua:"}
                              />
                            </Box>
                          ))}
                          <Button onClick={() => addNewAddress(item.id)}>
                            Adicionar
                          </Button>
                          <Button
                            disabled={hasOneRow}
                            onClick={() => removeAdressRow(item.id)}
                          >
                            Remover
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button disabled={!validate} onClick={handleSubmit}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
