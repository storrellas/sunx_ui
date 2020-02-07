import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";


// Project imports
import Startup from "./epics/Startup.js"
import Home from "./epics/Home.js";
import Landing from "./epics/Landing.js";

// Redux
import { Provider } from "react-redux";
import { store, renderConfetti, userCreated } from "./redux";

// Project imports
import CookieMgr from "./utils/CookieMgr"



const isAnonymous = () => {
  return (CookieMgr.get(CookieMgr.keys.TOKEN_ACCESS) === undefined &&
          CookieMgr.get(CookieMgr.keys.TOKEN_REFRESH) === undefined)
}

const mapStateToProps = state => {
  return { user: state.user };
};
class AuthenticatedRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: (isAnonymous() == false)
    }
  }

  render() {
    // console.log("-- AuthenticatedRoute:render -- ", isAnonymous() )
    // console.log(this.props.location)
    if(window.location.pathname.includes('/home')){
      return ( ((this.props.user != undefined)||this.state.authenticated)?
                <Route {...this.props} />:<Redirect to='/' />)
    }else{
      return ( <Route {...this.props} />)
    }
  }
}
const AuthenticatedRouteContainer = connect(mapStateToProps, null)(AuthenticatedRoute);

class AnonymousRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { anonymous: isAnonymous() }
  }

  render() {
    // console.log("-- AnonymousRoute:render -- ", isAnonymous(), this.state.anonymous )
    // console.log( this.props )
    if(window.location.pathname == '/'){
      return (this.state.anonymous?<Route {...this.props} />:<Redirect to='/home' />)
    }else{
      return ( <Route {...this.props} /> )
    }
  }
}


ReactDOM.render((
  <Provider store={store}>
      <BrowserRouter>
        <Startup> 
          <AnonymousRoute path="/" exact component={Landing} />
          <AuthenticatedRouteContainer exact path="/home" component={Home} />
        </Startup>
      </BrowserRouter>
  </Provider>
), document.getElementById('root'))