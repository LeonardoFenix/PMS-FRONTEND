import { SnackbarOrigin } from '@mui/material';
import React from 'react';

export interface INotifierProps {
  severity?: 'success' | 'info' | 'error' | 'warning';
  open: boolean;
  children: React.ReactNode;
  directions: SnackbarOrigin | undefined,
  handleClose: () => void;
}
