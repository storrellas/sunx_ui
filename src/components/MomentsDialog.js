import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';

// Project import
import SubmitButton from "./common/SubmitButton"
import TryASportDialog from "./common/TryASportDialog"
import calendarImage from "../assets/img/tryasport/img_calendar_orange.png"
import config from '../config/env'
import CookieMgr from "../utils/CookieMgr"

const styles = theme => ({
  cell:{
    margin: 10,
    backgroundColor: 'grey',
    width: "12%",
    transition: "0.3s",
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'orange',
      border: '1px solid black'
    },
    cursor: 'pointer'
  },
  cellEnable:{
    margin: 10,
    backgroundColor: 'orange',
    width: "12%",
    transition: "0.3s",
    borderRadius: 3,
    '&:hover': {
      backgroundColor: 'grey',
      border: '1px solid black'
    },
    cursor: 'pointer'
  },
});

class MomentsDialog extends React.Component {
  constructor(props) {
    super(props);

    const userJson = (props.user === undefined)?undefined:JSON.parse(props.user)
    this.state = {
      zIndex: 1000,
      sport_moments: (userJson === undefined)?[]:userJson.sport_moments
    }

    this.weekday2idx = {
      monday:0, tuesday:1, wednesday:2, 
      thursday:3, friday: 4, saturday:5, sunday:6
    }
  }

  handleClick(e, slot, weekday, enabled){
    let { sport_moments } = this.state;
    if( enabled ){
      sport_moments.push({slot: slot, weekday: weekday})
      this.setState({sport_moments: sport_moments})
    }else{
      const idx = sport_moments.findIndex( item => (item.slot === slot && item.weekday === weekday) )
      sport_moments.splice(idx, 1)
      this.setState({sport_moments: sport_moments})
    }
  }


  async handleSubmit(e){
    e.preventDefault();
    console.log("-- Contacting Backend --", this.props.userId)

    // Closing modal
    const url = `${config.BASE_API_URL}/api/sportmoment/burst/${this.props.userId}/`
    const body = this.state.sport_moments
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

    // Notify watchers
    this.props.onClose()
  }



  generate_row = (array, title, slot) =>  <tr>
                                            <td>{title}</td>
                                            {array.map((item, index) =>
                                              <td key={index} className={item.active?this.props.classes.cellEnable:this.props.classes.cell} 
                                                onClick={(e) => this.handleClick(e, slot, item.weekday, (item.active?false:true) )} />)}
                                          </tr>

  generated_weekday_selected_list(pattern){
    // Generate plain array in form [true, false, true, false, false ...]
    let weekday_selected_list = Array(7).fill(false)
    for (const moment of this.state.sport_moments) {
      if( moment.slot == pattern ){
        weekday_selected_list[this.weekday2idx[moment.weekday]] = true
      }
    }

    // Generate slot array
    const weekday_array = [{weekday:'monday', active: false}, {weekday:'tuesday', active: false}, 
                            {weekday:'wednesday', active: false}, {weekday:'thursday', active: false}, 
                            {weekday:'friday', active: false}, {weekday:'saturday', active: false}, {weekday:'sunday', active: false}]  
    let weekday_slot_array = weekday_array.map(a => Object.assign({}, a));
    for (const [idx,value] of weekday_selected_list.entries()) {
      weekday_slot_array[idx].active = value      
    }                            
    return weekday_slot_array;
  }

  render() {
    const { classes, onClose, open, user, translations } = this.props;

    // Generate matrix
    //const header_array = Array.from(' MTWTFSS')
    const header_array = Array.from(' ' + translations.moments_prompt_weekday)


    let weekday_selected_list = this.generated_weekday_selected_list('before_6')
    const row_before_0_6 = this.generate_row(weekday_selected_list, '00-06', 'before_6')

    weekday_selected_list = this.generated_weekday_selected_list('between_6_8')
    const row_between_6_8 = this.generate_row(weekday_selected_list, '06-08', 'between_6_8')

    weekday_selected_list = this.generated_weekday_selected_list('between_8_10')
    const row_between_8_10 = this.generate_row(weekday_selected_list, '08-10', 'between_8_10')

    weekday_selected_list = this.generated_weekday_selected_list('between_10_12')
    const row_between_10_12 = this.generate_row(weekday_selected_list, '10-12', 'between_10_12')

    weekday_selected_list = this.generated_weekday_selected_list('between_12_14')
    const row_between_12_14 = this.generate_row(weekday_selected_list, '12-14', 'between_12_14')

    weekday_selected_list = this.generated_weekday_selected_list('between_14_16')
    const row_between_14_16 = this.generate_row(weekday_selected_list, '14-16', 'between_14_16')

    weekday_selected_list = this.generated_weekday_selected_list('between_16_18')
    const row_between_16_18 = this.generate_row(weekday_selected_list, '16-18', 'between_16_18')

    weekday_selected_list = this.generated_weekday_selected_list('between_18_20')
    const row_between_18_20 = this.generate_row(weekday_selected_list, '18-20', 'between_18_20')

    weekday_selected_list = this.generated_weekday_selected_list('between_20_22')
    const row_between_20_22 = this.generate_row(weekday_selected_list, '20-22', 'between_20_22')

    weekday_selected_list = this.generated_weekday_selected_list('after_22')
    const row_between_22_00 = this.generate_row(weekday_selected_list, '22-00', 'after_22')
    return (
      <TryASportDialog image={calendarImage} open={open} onClose={onClose}>

          <DialogTitle id="simple-dialog-title" style={{textAlign: "center", marginTop: 80}}>
            <div>{translations.moments_prompt_title}</div>
            <i>{translations.moments_prompt_sub}</i>
          </DialogTitle>

          <Box mt={2} ml={3} mr={3} borderRadius={16}>

            <table style={{width:"100%"}}>
              <thead>
                <tr>
                  {header_array.map((item,index) => 
                    <th key={index}>{item}</th>)}
                </tr>
              </thead>
              <tbody>
              {row_before_0_6}
              {row_between_6_8}
              {row_between_8_10}
              {row_between_10_12}
              {row_between_12_14}
              {row_between_14_16}
              {row_between_16_18}
              {row_between_18_20}
              {row_between_20_22}
              {row_between_22_00}
              </tbody>
            </table>

          </Box>


          <SubmitButton onSubmit={(e) => this.handleSubmit(e)}/>

      </ TryASportDialog>
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

export default withStyles(styles)(MomentsDialog);

