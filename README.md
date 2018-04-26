### Simple React Wrapper around [OIDC-Client](https://github.com/IdentityModel/oidc-client-js).

## Install

##### NPM

`npm install --save React-OpenIdConnect`

## Usage

Import the component and add ```<Authenticate>``` to you react app. All its children will be rendered when the user is authenticated. Otherwise a text is show asking the user to login, this text is provided as a prop. 

The JWT is provided trough the callback **'userLoaded'** and is called at them moment the user is retrieved from the identityserver. **'userUnLoaded'** is called when the user is removed from session. Its up to you to decided what to do with the JWT.

Depending on the IdentityServer used, the JWT has an **acces_token** and an **id_token** which can be used to add to your Fecth request headers as bearer token. Theis will grantyou access to the resource server.

## Example

Assuming a Create-React app.

In you app.js file

```js
import React, { Component } from 'react';
import Authenticate from 'react-OpenIdConnect';
import OidcSettings from './oidcsettings';

class App extends Component {

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
    return <div>You are not authenticated, please click here to authenticate.</div>;
  }

  render() {
      return (
        <Authenticate OidcSettings={OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>
            <div>If you see this you are authenticated.</div>
        </Authenticate>
      )
  }
}
```

### OidcSettings provides the following properties.

- **authority** (string): The URL of the OIDC/OAuth2 provider.
- **client_id**	(string): Your client application’s identifier as registered with the OIDC/OAuth2 provider.
- **redirect_uri** (string): The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
- **scope**	(string): The scope being requested from the OIDC/OAuth2 provider (default: ‘openid’).

#### Example:

Create a oidcsettings.js file in the same map as you app.js and provide your Oidc settings.

```js
var OidcSettings = {
  client_id: '581912277515-8pqeloei552og7pa13iufb57iug8vu9k.apps.googleusercontent.com',
  redirect_uri: `https://localhost:9090/`, 
  scope: 'openid profile https://www.googleapis.com/auth/youtube.readonly',
  authority: 'https://accounts.google.com'  
};

export default OidcSettings;
```

You need to start your React app using the same url as in redirect_uri. The way to do this is to change the start script inside your package.json to.

```js
"start": "set PORT=9090&&set HTTPS=true&&react-scripts start",
```

**NOTE**: when authenticating against an identity provider, a redirect is used to provide the required token via the querystring. The ```<Authenticate>``` needs to pick-up this token so be sure the component is rendered when the redirect-url is called.