import instance from "../config/api";
import * as React from "react";
import { IClient } from "../interfaces";

import isValidCPF from "../utils/ValidCPF";
const path = "/client";

export const useClient = () => {
  const [clients, setClients] = React.useState<IClient[]>([]);

  const getClients = React.useCallback(async () => {
    const { status, data } = await instance.get<IClient[]>(path);

    if (status !== 200) throw new Error();

    setClients(data);
  }, []);
  const deleteClient = React.useCallback(
    async (id: Number) => {
      const { status } = await instance.delete<IClient[]>(path, {
        params: {
          id,
        },
      });

      if (status !== 200) throw new Error();
      getClients();
      return "Cliente excluído com sucesso";
    },
    [getClients]
  );
  const createClient = React.useCallback(async (data: IClient) => {
    if (!isValidCPF(data.cpf)) {
      return { success: false, message: "CPF Inválido." };
    }

    const response = await instance.post<string>(path, data);
    if (response.status !== 201) {
      return { success: false, message: response.data };
    } else {
      return { success: true, message: "Cliente registrado com sucesso!" };
    }
  }, []);

  const updateClient = React.useCallback(async (data: IClient) => {
     const id = data.id;

    const response = await instance.put<string>(path, data, {
      params: {
      id,
      },
    });
    if (response.status !== 200) {
      return { success: false, message: response.data };
    } else {
      getClients();
      return { success: true, message: "Cliente atualizado com sucesso!" };
   
    }
  }, []);

  return {
    createClient,
    deleteClient,
    getClients,
    updateClient,
    clients,
  };
};
