import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Other imports
import queryString from 'query-string'


// Redux
import { userCreated, translations } from "../redux";

// React-redux
import { connect } from "react-redux";

// Project imports
import CookieMgr from "../utils/CookieMgr"
import StorageMgr from "../utils/StorageMgr"
import config from '../config/env'
import ForgotDialog from '../components/ForgotDialog'
import Progress from './Progress';

// Images
import backgroundTopImage from "../assets/img/img_BackGroundWaves_top.png"
import backgroundImage from "../assets/img/img_bg.png"
import logoImage from "../assets/img/tryasport/img_logo.png"
import ukImage from "../assets/img/uk.png"
import nlImage from "../assets/img/nl.png"


const styles = theme => ({
  root: {
    backgroundColor:'white', 
    height: '100vh', 
    padding: 0,
    fontFamily: 'Montserrat',
    fontSize: 16,
    position: 'relative'
  },
  loadingContainer:{
    height: '100%', 
    borderRadius: 16, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  mainTitle:{
    position: 'relative',
    backgroundImage: "linear-gradient(90deg, #F76D1D 0%, #FFCC27 100%)",
    textAlign: 'center',
    fontSize: 18,
    color: '#FFFFFF'
  },
  mainBackground: {
    width: "100%", 
    height: "100%", 
    position: 'absolute', 
    bottom: 0, 
    left: 0
  },
  mainTitleBackground: {
    width: "100%", 
    height: "100%", 
    position: 'absolute', 
    top: 0, 
    left: 0
  },
  mainTitleContainer:{
    zIndex: 10, 
    position: 'relative',
    height: "35vh",
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  content:{
    paddingTop: 20, 
    textAlign: 'center', 
    color: '#3F3F3F',
    position: 'relative'
  },
  flag:{
    width: "40%", 
    cursor: 'pointer'
  },
  button:{
    borderRadius: 25,
    width: "50%",
    backgroundColor: '#00CA9D',
    '&:hover':{
      backgroundColor: '#005643'
    }
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

const mapStateToProps = state => {
  return { translations: state.translations };
};
function mapDispatchToProps(dispatch) {
  return {
    userCreated: (data) => dispatch(userCreated(data)),
  };
}

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  fetch_translations(lan){
    return new Promise( async (resolve, reject) => {

      const response = await fetch(config.BASE_API_URL + `/api/config/translations/?lan=${lan}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },    
      })
      const data = await response.json()
      //console.log("translations" + JSON.stringify(data))
      // Store translations
      StorageMgr.set(StorageMgr.keys.TRANSLATIONS, JSON.stringify(data));
  
      return resolve(data)
    })

  }

  async handleSelectLanguage(e, lan){

    // Create User
    let body = { language: lan }
    let response = await fetch(config.BASE_API_URL + '/api/user/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    let data = await response.json()

    // Store tokens
    CookieMgr.set(CookieMgr.keys.TOKEN_ACCESS, data.access)
    CookieMgr.set(CookieMgr.keys.TOKEN_REFRESH, data.refresh)
  
    // Move to Home URL
    this.props.history.push('/home')

    // Get translations
    const translations = await this.fetch_translations(lan);
    // Transform to dict
    const translations_dict = {}
    for (const translation of translations)
      translations_dict[translation.param]  = translation.value

    this.props.userCreated({user:data, translations: translations_dict})
  }

  async componentDidMount(){

    // If coming from link
    const parsed = queryString.parse(this.props.location.search);
    if( !('key' in parsed && 'value' in parsed) ){
      return;
    }

    // Get token
    let body = { username: parsed['key'], password: parsed['value'] }    
    let response = await fetch(config.BASE_API_URL + '/api/token/', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify(body)
    })
    let data = await response.json()
    CookieMgr.set(CookieMgr.keys.TOKEN_ACCESS, data.access)
    CookieMgr.set(CookieMgr.keys.TOKEN_REFRESH, data.refresh)

    // Get whoami
    response = await fetch(config.BASE_API_URL + '/api/user/whoami/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': ('Bearer ' + CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS))
      },    
    })
    data = await response.json()

    // Move to Home URL
    this.props.history.push('/home')
    this.props.userCreated(data)
  }


  handleClose(){
    console.log('The link was closed')
    this.setState({ open: false, })
  };

  handleClick(e){
    console.log('The link was closed')
    this.setState({ open: true, })
  }

  render() {
    const { classes, translations } = this.props;
    
    console.log("-- Landing --")

    // Return progress if dont have translations
    if( this.props.translations === undefined )
      return (<Progress />);

    return (
      <div> 
        <Container maxWidth="sm" className={classes.root}>
          <img src={backgroundImage} className={classes.mainBackground} />
          <CssBaseline />
          <Box m={0} p ={0} className={classes.mainTitle}>
              <img src={backgroundTopImage} className={classes.mainTitleBackground} />
              <div className={classes.mainTitleContainer}>
                <b style={{paddingBottom: '1em'}}>{translations.landing_main_title}</b>
                <div>
                  <img src={logoImage} style={{ width: "30%"}}></img> 
                </div>
                
                <b>{translations.landing_sub_title}</b>
              </div>
          </Box>

          <Container maxWidth={false}  className={classes.content}>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <b style={{ fontSize: 18 }}>{translations.landing_content_title}</b>
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <Divider variant="middle" />
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <div>{translations.landing_content}</div>
            </Box>

            <Box mt={3} ml={3} mr={3} borderRadius={16} style={{display: 'flex', justifyContent: 'center'}}>
              <Grid container spacing={3} style={{width: "75%"}}>
                <Grid item xs={6} onClick={(e) => this.handleSelectLanguage(e, 'en')}>
                  <img src={ukImage} className={classes.flag}></img> 
                </Grid>
                <Grid item xs={6} onClick={(e) => this.handleSelectLanguage(e, 'nl')}>
                  <img src={nlImage} className={classes.flag}></img> 
                </Grid>
              </Grid>
            </Box>

            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <b>{translations.landing_content_sub}</b>
            </Box>

            <Box mt={2} ml={3} mr={3}>
              <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => this.handleClick(e)}>       
                <b>{translations.landing_button}</b>
              </Button>
            </Box>


            <Box mt={2} ml={3} mr={3} borderRadius={16}>
              <div>{translations.landing_bottom}</div>              
            </Box>

            <ForgotDialog open={this.state.open} onClose={(e) => this.handleClose()} />

          </Container>

        </Container>

      </div>
    );
  }
}
//export default withRouter(withStyles(styles)(Landing));
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Landing));


