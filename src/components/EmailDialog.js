import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';


// Project import
import TryASportDialog from "./common/TryASportDialog"
import SubmitButton from "./common/SubmitButton"
import mailboxImage from "../assets/img/tryasport/img_mailbox_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

const styles = theme => ({
});

class EmailDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      email: '',
      confirm: '',
      error: false,
      helperText: ''
    }
  }

  handleChange(e){
    if( e.target.id == 'email-input')    
    this.setState({ email: e.target.value})
    if( e.target.id == 'confirm-input')      
      this.setState({ confirm: e.target.value})
  };


  async handleSubmit(e){
    e.preventDefault();

    // Closing modal
    const {email, confirm} = this.state
    if( email === confirm ){

      const url = `${config.BASE_API_URL}/api/user/${this.props.userId}/`
      const body = { email: email }
      let response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
        },
        method: 'put',
        body: JSON.stringify(body)
      })
      let data = await response.json()

      // Notify watchers
      this.props.onClose()
    }else{
      this.setState({ error: true, helperText: 'Emails do not match' })
    }
  }

  render() {

    const { classes, onClose, open, translations } = this.props;
    const { error, helperText } = this.state;
    return (
      <TryASportDialog image={mailboxImage} open={open} onClose={onClose}>

          <DialogTitle id="email-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            <p>{translations.email_prompt_2_title}</p>
            <p>{translations.email_prompt_2_form}</p>
          </DialogTitle>

          <Box mt={0} ml={3} mr={3} borderRadius={16}>
            <TextField          
              id="email-input"
              label={translations.email_prompt_2_placeholder}
              className={classes.textField}
              type="text"
              name="mail"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              style={{width: "100%"}}
              onChange={(e) => this.handleChange(e)}
              value={this.state.email}
            />
            <TextField
              error={error}
              id="confirm-input"
              label={translations.email_prompt_2_placeholder_confirm}
              className={classes.textField}
              type="text"
              name="confirm"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              style={{width: "100%"}}
              onChange={(e) => this.handleChange(e)}
              value={this.state.confirm}
              helperText={helperText}
            />
          </Box>

          <SubmitButton onSubmit={(e) => this.handleSubmit(e)}/>

          <DialogTitle id="bottom-dialog-title" style={{textAlign: "center"}}>
            <p>{translations.email_prompt_2_bottom_1}</p>
            <p>{translations.email_prompt_2_bottom_2}</p>
          </DialogTitle>       
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

export default withStyles(styles)(EmailDialog);
//export default connect(null, mapDispatchToProps)(withStyles(styles)(EmailDialog));



