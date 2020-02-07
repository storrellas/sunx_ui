import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';



const styles = theme => ({
  root: {
    backgroundColor:'white', 
    height: '100vh', 
    padding: 0,
    fontFamily: 'Montserrat',
    fontSize: 16,
    position: 'relative'
  },
  progressRoot:{
    height: 10
  },
  progressBarColor:{
    backgroundColor: '#F76D1D'
  },
  progressColor:{
    backgroundColor: '#FFCC27'
  }
});


class Progress extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <Container maxWidth="sm" className={classes.root} style={{ display: 'flex',  backgroundColor:'#E5E7E9' }}>

        <div style={{ width: "100%", alignSelf: 'center', marginLeft: 16, marginRight: 16}}>
          <LinearProgress color="primary"
            classes={{ root: classes.progressRoot, barColorPrimary: classes.progressBarColor,
                      colorPrimary: classes.progressColor }}/>
          <div style={{ marginTop: 10, textAlign:'center' }}>Loading ...</div>          
        </div>

      </Container>
    );
  }
}
//export default withRouter(withStyles(styles)(Landing));
export default (withStyles(styles)(Progress));


