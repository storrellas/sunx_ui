import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';

// Project import
import SubmitButton from "./common/SubmitButton"
import TryASportDialog from "./common/TryASportDialog"
import genderImage from "../assets/img/tryasport/img_gender_orange.png"
import maleImage from "../assets/img/tryasport/img_male.png"
import femaleImage from "../assets/img/tryasport/img_female.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

const styles = theme => ({
});

class GenderDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1000
    }
  }

  async handleClick(e, gender) {

    const url = `${config.BASE_API_URL}/api/user/${this.props.userId}/`
    const body = { gender: gender }
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

  render() {
    const { classes, onClose, open, translations } = this.props;
    return (
      <TryASportDialog image={genderImage} open={open} onClose={onClose}>
          <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            {translations.gender_prompt_title}
          </DialogTitle>

          <Box mt={2} mr={10} ml={10} style={{display:'flex', justifyContent: 'center'}}>
            <div style={{width: "30%"}} >
              <Button variant="contained" style={{height: "50%"}} onClick={(e) => this.handleClick(e, 'male')}>
                <img src={maleImage} style={{width:"100%"}} />
              </Button>
              <p>{translations.gender_prompt_male}</p>
            </div>
            
            <b style={{alignSelf: 'center', marginLeft: 10, marginRight: 10}}>{translations.gender_prompt_or}</b>
            <div style={{width: "30%"}} >
              <Button variant="contained" style={{height: "50%"}} onClick={(e) => this.handleClick(e, 'female')}>
                <img style={{width:"100%"}} src={femaleImage} />
              </Button>
              <p>{translations.gender_prompt_female}</p>
            </div>
          </Box>

          <SubmitButton onSubmit={() => console.log("NotImplementedYet")}/>

          <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
            <Button variant="contained" onClick={(e) => this.handleClick(e, 'prefer_not_to_say')}>
              {translations.gender_prompt_sub}
            </Button>
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

export default withStyles(styles)(GenderDialog);

