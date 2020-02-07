import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

// Project import
import TryASportDialog from "./common/TryASportDialog"
import SubmitButton from "./common/SubmitButton"
import cakeImage from "../assets/img/tryasport/img_cake_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

// Redux
import { connect } from "react-redux";

const styles = theme => ({
});

class BirthyearDialog extends React.Component {
  constructor(props) {
    super(props);
    this.year_choice = 
      Array(new Date().getFullYear() - 1900 + 1).fill().map((_, idx) => ({value:(1900 + idx), label:(1900+idx)})  )
    this.state = {
      zIndex: 1000,
      birthyear: this.year_choice[0].value
    }
  }


  async handleSubmit(){
    const url = `${config.BASE_API_URL}/api/user/${this.props.userId}/`
    const body = { birthyear: parseInt(this.state.birthyear) }
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
  }

  handleChange(e){
    this.setState({ birthyear: e.target.value })
  }

  render() {
    const { classes, onClose, open, translations } = this.props;

    return (
      <TryASportDialog image={cakeImage} open={open} onClose={onClose}>

        <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
          {translations.birthday_prompt_title}
        </DialogTitle>

        <Box mt={2} ml={3} mr={3} borderRadius={16}  style={{display:'flex', justifyContent: 'center'}}>
          <TextField
            id="birthyear"
            select
            label="Select"
            className={classes.textField}
            style={{width: "50%"}}
            value={this.state.birthyear}
            onChange={(e) => this.handleChange(e)}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your birthyear"
            margin="normal"
            inputProps={{
              style: { textAlign: "right" }
            }}
          >
            {this.year_choice.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

        </Box>

        <SubmitButton onSubmit={(e) => this.handleSubmit(e)}/>
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

export default withStyles(styles)(BirthyearDialog);
//export default connect(null, mapDispatchToProps)(withStyles(styles)(BirthyearDialog));


