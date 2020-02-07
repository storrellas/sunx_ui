import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import InputAdornment from '@material-ui/core/InputAdornment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';



// Project import
import TryASportDialog from "./common/TryASportDialog"
import friendsImage from "../assets/img/friends.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"
import FriendCard from "./FriendCard"

const styles = theme => ({
});

class FriendDialog extends React.Component {
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

  handleKeyPress(){
    if(event.key === 'Enter'){
      this.handleSearch()
    }  
  };

  handleChange(e){
    this.setState({ friend: e.target.value})
  }

  async handleSearch(e){
    
    try{

      const username = this.state.friend
      const response = await fetch( `${config.BASE_API_URL}/api/user/lookup/?username=${username}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
        }        
      })
      if (!response.ok) throw Error(response.statusText);    
      const data = await response.json()

      // NOTE: This causes to display friend list
      //this.setState({ friendJson: data })      
      this.props.onCloseAddFriend(data)
    }catch(e){
      // NOTE: This causes to display friend list
      //this.setState({ friendJson: this.state.defaultFriendJson })
      this.props.onCloseAddFriend()
    }
  }

  async handleAddFriend(e){   
    const body = { user: this.props.userId, friend: this.state.friendJson.id }
    const response = await fetch( `${config.BASE_API_URL}/api/friend/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()

    // Close dialog
    this.props.onClose()
  }

  render() {
    const { classes, onClose, sportDict, open, translations } = this.props;
    // console.log("-- FriendDialog --")
    // console.log(this.state.friendJson)
    let friendSearch = <div></div>
    if( this.state.friendJson !== undefined )
      friendSearch = <FriendCard sportDict={sportDict}
                                 friend={this.state.friendJson} 
                                 handleAddFriend={(e) => this.handleAddFriend(e)}/>

    return (
      <TryASportDialog image={friendsImage} open={open} onClose={onClose}>

          <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            {translations.friends_prompt_title}
          </DialogTitle>

          <Box mt={2} ml={3} mr={3} borderRadius={16}>
          <TextField
              id="outlined-friend-input"
              label={translations.friends_prompt_placeholder}
              className={classes.textField}
              type="text"
              name="code"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              style={{width: "100%"}}
              onKeyPress={(e) => this.handleKeyPress(e)}
              onChange={(e) => this.handleChange(e)}
              value={this.state.friend}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="Toggle password visibility"
                      onClick={(e) => this.handleSearch(e)}
                    >
                      <PlayArrowIcon style={{color:'green'}}></PlayArrowIcon>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
            {friendSearch}
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

export default withStyles(styles)(FriendDialog);

