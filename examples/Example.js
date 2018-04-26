import React from 'react';
import Authenticate from '../src/index';

const OidcSettings = {
    authority: '',  client_id: '', redirect_uri: '', post_logout_redirect_uri: '', response_type: '', scope: ''
  };

const Authenticated = (user) => { 
    if (user !== undefined && user.user !== undefined) {
     return (<div>Hello dear {user.user.profile.ecare_internalUsername} you are authenticated.</div>);
    }
    return null;
};

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.userLoaded = this.userLoaded.bind(this); 
        this.userUnLoaded = this.userUnLoaded.bind(this);
    
        this.state = { user: undefined };
      }  
    
      userLoaded(user) {
        if (user)
          this.setState({ "user": user });
      } 
      
      userUnLoaded() {
        this.setState({ "user": undefined });
      } 
    
      NotAuthenticated() {
        return <div>You are not authenticated please click here to authenticate.</div>; 
      }
    
      render() {
        return (          
            <Authenticate OidcSettings={OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>
              <Authenticated user={this.state.user} />
            </Authenticate>         
        );
      }
}

export default Example;