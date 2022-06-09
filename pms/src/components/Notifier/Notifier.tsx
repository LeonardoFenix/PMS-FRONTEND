import { Alert, Snackbar } from '@mui/material';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React from 'react';
import { INotifierProps } from './types';
const variants: Variants = {
  open: {
    opacity: 1,
    x: 0
  },
  close: {
    opacity: 1,
    x: 1000
  },
  exit: {
    opacity: 0,
    x: 1000,
    transition: {
      duration: 0.8
    }
  }
};
function Notifier({ severity = 'success', ...props }: INotifierProps) {
  const AnimatedSnackbar = motion(Snackbar);
  return (
    <AnimatePresence>
      {props.open && (
        <AnimatedSnackbar
          variants={variants}
          transition={{
            duration: 0.6,
            type: 'spring',
            mass: 0.5
          }}
          animate="open"
          exit="exit"
          initial="close"
          open={props.open}
          autoHideDuration={10000}
          anchorOrigin={props.directions}
          onClose={props.handleClose}
        >
          <Alert
            severity={severity}
            sx={{
              color: 'black'
            }}
          >
            {props.children}
          </Alert>
        </AnimatedSnackbar>
      )}
    </AnimatePresence>
  );
}

export default Notifier;
