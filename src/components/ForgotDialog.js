import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';

// Project import
import SubmitButton from "./common/SubmitButton"
import TryASportDialog from "./common/TryASportDialog"
import forgotImage from "../assets/img/tryasport/img_key_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"


// Redux
import { userProfile } from "../redux";
import { connect } from "react-redux";

const styles = theme => ({
  root:{
    fontFamily: 'Montserrat',
    fontSize: 16,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    userProfile: (data) => dispatch(userProfile(data)),
  };
}
const mapStateToProps = state => {
  return { translations: state.translations };
};

class ForgotDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000,
      email: '',
      error: false,
      helperText: ''
    }
  }

  handleChange(e){
    this.setState({ email: e.target.value})
  };


  async handleSubmit(e){
    e.preventDefault();

    const url = `${config.BASE_API_URL}/api/user/forgot/`
    const body = { email: this.state.email }
    let response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    let data = await response.json()

    this.props.onClose()
  }

  render() {
    const { classes, onClose, open, translations } = this.props;
    const { error, helperText } = this.state;

    return (
      <TryASportDialog className={classes.root} image={forgotImage} open={open} onClose={onClose}>

          <div style={{textAlign: "center"}}>
            <b>{translations.email_prompt_1_title}</b>
            <div>{translations.email_prompt_1_sub}</div>
            <div>{translations.email_prompt_1_form}</div>
          </div>

          <Box borderRadius={16}>
            <TextField          
              id="email-input"
              label={translations.email_prompt_1_form}
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
          </Box>

          <SubmitButton onSubmit={(e) => this.handleSubmit(e)}/>

          <div style={{textAlign: "center"}}>
            <p>{translations.email_prompt_1_bottom_1}</p>
            <p>{translations.email_prompt_1_bottom_2}</p>
          </div>
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

//export default withStyles(styles)(EmailDialog);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForgotDialog));



