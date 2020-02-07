import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';


// Project import
import config from '../config/env'

// Redux
import { renderConfetti } from "../redux";
import { connect } from "react-redux";


const styles = theme => ({
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',
    position: 'relative',
    overflowY: 'initial',
    backgroundImage: "linear-gradient(203deg, #BEBEBE 0%, #FFFFFF 100%)",
    border: "5px solid #F76D1D"
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

function mapDispatchToProps(dispatch) {
  return {
    renderConfetti: enabled => dispatch(renderConfetti(enabled))
  };
}

class NewFriendDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      friend: '',
      friendJson: undefined,
      defaultFriendJson: {
        first_name : 'Not Found',
        last_name : '',
        picture: "/media/default/placeholder_user.jpg",
        sports: []
      }
    }
  }

  componentDidUpdate(){
    if(this.props.open){
      this.props.renderConfetti(true)
      setTimeout(() => { this.props.renderConfetti(false) }, 3000);
    }
  }

  handleChange(e){
    this.setState({ friend: e.target.value})
  }

  render() {
    const { classes, onClose, friend, open } = this.props;
    // console.log("-- NewFriendDialog --")

    let first_name = ""
    let last_name = ""
    let picture = ""
    if( friend !== undefined){
      first_name = friend.first_name
      last_name = friend.last_name
      picture = `${config.BASE_API_URL}${friend.picture}`
    }    

    return (
      <Dialog maxWidth="xs" fullWidth 
              classes={{ paper: classes.dialogPaper }} onClose={onClose} 
              aria-labelledby="simple-dialog-title" open={open}>

        <IconButton aria-label="Close" className={classes.closeButton} 
            onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          <b>New Friend</b>
        </DialogTitle>

        <Box style={{ display:'flex', justifyContent: 'center', width:"100%", height: "5em"}}>
          <Box mt={2} p={1} style={{display:'flex', justifyContent: 'center', backgroundColor: 'orange', borderRadius: '10px', border: '2px solid #4D6ED3', width: '50%'}}>

            <img height="100%" src={picture} />
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              {first_name}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2" style={{alignSelf: 'center', marginLeft: 10 }}>
              {last_name}
            </Typography>
          </Box>
        </Box>
      </Dialog>
    );
  }
}

/*
FriendDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  selectedValue: PropTypes.string,
};
/**/

//export default withStyles(styles)(NewFriendDialog);
export default connect(null, mapDispatchToProps)(withStyles(styles)(NewFriendDialog));

