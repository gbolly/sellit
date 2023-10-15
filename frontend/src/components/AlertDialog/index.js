import { forwardRef }from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AlertDialogSlide = ({show, setShow, handleConfirm, title, msg}) => {
  const onConfirm = () => {
    handleConfirm();
    setShow(false);
  };

  return (
    <Dialog
      open={!!show}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setShow(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};
