import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';


const styles = theme => ({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    position: 'relative',
    overflowY: 'initial',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  closeButton: {
    color: "#4B4B4B",
  },
});

class TryASportDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000
    }
  }

  render() {
    const { classes, onClose, open } = this.props;
    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>

        <div style={{ width: "100%", borderRadius: '10px', position: 'absolute', 
                    top: "-10%", display: 'flex', justifyContent: 'center'}}>
          <img width="50%" src={this.props.image} />
        </div>

        <div style={{ textAlign: 'right', height: '10vh'}}>
            <IconButton aria-label="Close" 
                        className={classes.closeButton} onClick={onClose}>
                <CloseIcon />
            </IconButton>
        </div>

        <DialogContent style={{ padding: "0 10 0 10", overflowY: 'auto'}}>
          {this.props.children}
        </DialogContent>
      </Dialog>
    );
  }
}



export default withStyles(styles)(TryASportDialog);

