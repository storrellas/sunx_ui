import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import InputAdornment from '@material-ui/core/InputAdornment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';

// Project import
import TryASportDialog from "./common/TryASportDialog"
import shareImage from "../assets/img/share.png"
import config from '../config/env'


const styles = theme => ({
  button:{
    width: '75%', 
    display: 'flex',
    borderRadius:'100px', 
    justifyContent: 'center',
    backgroundColor: '#00CA9D',
    color: 'white',
    '&:hover':{
      backgroundColor: '#005643'
    }
  },
  code:{
    width: '75%', 
    color: '#00CA9D',  
    backgroundColor: '#D3FFF5', 
    padding: '0.5em', 
    border: '2px solid #00CA9D', 
    borderStyle: 'dashed', 
    fontSize: '24px'
  },
  error:{
    width: '75%', 
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#FF6D6D',
    border: '2px solid #FF2424', 
    borderStyle: 'dashed', 
    color: 'white',
    '&:hover':{
      backgroundColor: '#FF6D6D',
    }
  }
});

class ShareDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      name: '',
      webSharing: true
    }
  }

  handleKeyPress(){
    if(event.key === 'Enter'){
      this.handleSubmit()
    }  
  };

  handleChange(e){
    this.setState({ name: e.target.value})
  }

  handleSubmit(e){
    //console.log("Contacting Backend", this.state.friend)

    if (navigator.share) {
      const userJson = (this.props.user === undefined)?"":JSON.parse(this.props.user);
      const text = `Hey,\n Its ${this.state.name},\n` + 
                    `Do you like to find new sports to play?\n` + 
                    `Find me on TryASport by introducing this code: ${userJson.username}\n`
      navigator.share({
        title: "TryASport",
        text: text,
        url: config.BASE_API_URL
      }).then(() => {
        // Do nothing
      })
      .catch(console.error);
    } else {
      this.setState({webSharing: false})
    }
  }

  render() {
    const { classes, onClose, open, user, translations } = this.props;
    const userJson = (user === undefined)?"":JSON.parse(user);
    const username = (userJson==="")?"":userJson.username;

    const error = <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
                    <Button variant="contained" className={classes.error} onClick={(e) => this.setState({webSharing: true})}>
                      <div style={{flexGrow: 1}}>WebSharing not allowed</div>
                    </Button>
                  </Box>
    const errorRender = (this.state.webSharing==true)?"":error;

    return (
      <TryASportDialog image={shareImage} open={open} onClose={onClose}>

          <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
              <b>{translations.share_title}</b>
              <div>{translations.share_sub}</div>
          </DialogTitle>

          <Box mt={2} ml={3} mr={3} borderRadius={16}>
          <TextField
              id="outlined-friend-input"
              label={translations.share_placeholder}
              className={classes.textField}
              type="text"
              name="code"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              style={{width: "100%"}}
              onKeyPress={(e) => this.handleKeyPress(e)}
              onChange={(e) => this.handleChange(e)}
              value={this.state.name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={(e) => this.handleSubmit(e)}
                    >
                      <PlayArrowIcon style={{color:'green'}}></PlayArrowIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {errorRender}

          <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
            <Button variant="contained" className={classes.button} onClick={(e) => this.handleSubmit(e)}>
              <div style={{flexGrow: 1}}>{translations.share_button}</div>
            </Button>
          </Box>

          <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
            <Box mt={2} className={classes.code}>
              <div style={{flexGrow: 1, textAlign: 'center'}}>{username}</div>
            </Box>
          </Box>
 
      </TryASportDialog>
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

export default withStyles(styles)(ShareDialog);

