import React from "react";

// Project imports
import StorageMgr from "../utils/StorageMgr"
import ConfettiGenerator from "../lib/Confetti";
import config from '../config/env'

// React-redux
import { connect } from "react-redux";
import { translations } from "../redux";


const mapStateToProps = state => {
  return { confetti: state.confetti };
};
function mapDispatchToProps(dispatch) {
  return {
    translations: (data) => dispatch(translations(data)),
  };
}

class Startup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zIndex: 1500
    }

    // Confetti holder    
    this.confetti = null
    this.confettiSettings = { target: 'my-canvas' }
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

  fetch_geolocation(){
    return new Promise( (resolve, reject) => {

      if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
          async function success(position) {
  
            // Get whoami
            const lat = position.coords.latitude
            const lng = position.coords.longitude
            const response = await fetch(config.BASE_API_URL + `/api/geolocation/?lat=${lat}&lng=${lng}`)
            const data = await response.json()
            //console.log(data)
            return resolve(data.response.country_code)
          },
          function error(error_message) {
            // for when getting location results in an error
            //console.error('An error has occured while retrieving location', error_message)
            return resolve('uk')
          }  
        );
      } else {
        // geolocation is not supported
        // get your location some other way
        //console.log('geolocation is not enabled on this browser')
        return resolve('uk')
      }

    })
  }

  async componentDidMount(){

    const translations = StorageMgr.get(StorageMgr.keys.TRANSLATIONS)
    if( translations === undefined ){
      console.log("Translations undefined ...")

      // Geolocate
      let language = ''

      // Get country
      const country = await this.fetch_geolocation()

      // Fetch translations
      language = config.DEFAULT_LANGUAGE
      // if( country == 'nl') language = 'nl'
      // if( country == 'uk') language = 'en'
 
      console.log('selected language')

      const translations_json = await this.fetch_translations(language)

      // Transform to dict
      const translations_dict = {}
      for (const translation of translations_json)
        translations_dict[translation.param]  = translation.value

      // Dispatch
      this.props.translations(translations_dict)
    }else{
      const translations_json = JSON.parse(translations)
      // Transform to dict
      const translations_dict = {}
      for (const translation of translations_json)
        translations_dict[translation.param]  = translation.value

      // Dispatch
      this.props.translations(translations_dict)
    }

  }

  componentDidUpdate(){   
    if(this.props.confetti){
      // Create confetti object
      this.confetti = new ConfettiGenerator(this.confettiSettings);
      this.state.zIndex = 1500
      this.confetti.render();
    }else{
      this.confettiSettings.width = 0
      this.confettiSettings.height = 0
      this.confetti.clear();
    }
  }

  render() {
    return (
      <div>
        <canvas id="my-canvas" width={200} height={200} style={{ position:'absolute', backgroundColor: 'transparent', zIndex: this.state.zIndex }}></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Startup);