import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

// Redux
import { connect } from "react-redux";

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
});

const mapStateToProps = state => {
  return { translations: state.translations };
};

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const { classes, onSubmit, translations } = this.props;

    return (
      <Box mt={2} style={{display:'flex', justifyContent: 'center'}}>
        <Button variant="contained" className={classes.button} onClick={(e) => onSubmit(e)}>
          <div style={{flexGrow: 1}}>{translations.common_ok_button}</div>
        </Button>
      </Box>
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

export default connect(mapStateToProps, null)(withStyles(styles)(SubmitButton));



