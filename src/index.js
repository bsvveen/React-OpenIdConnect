import React, { Component } from 'react';
import propTypes from 'prop-types';
import { UserManager } from 'oidc-client';

/** 
 * @render react
 * @name Authenticate
 * @description OpenId Connect based Authentication Component
 * @example  
 * <Authenticate OidcSettings={this.OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>
      <div>If you see this you are authenticated.</div>
   </Authenticate>
 */
class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.signin = this.signin.bind(this);        
        this.onUserLoaded = this.onUserLoaded.bind(this);

        this.state = { isAuthenticated: false };
    }

    UNSAFE_componentWillMount() {

        this.userManager = new UserManager(this.props.OidcSettings);
        this.userManager.events.addUserLoaded(this.onUserLoaded);
        this.userManager.events.addUserUnloaded(this.onUserUnloaded);

        this.userManager.getUser().then((user) => {
            if (user !== null && user !== undefined) {                
                this.onUserLoaded(user);
            } else if (this.isSuccessfullyAuthenticated()) {
                this.userManager.signinRedirectCallback().then(() => {                   
                    window.history.replaceState({}, "", "/");
                }).catch(function (err) {
                    console.log("Error signinRedirectCallback: ", err);
                });
            }
        })
    }

    isSuccessfullyAuthenticated() {
        if (this.props.checkAuthentication !== undefined) {
            return this.props.checkAuthentication();
        }

        return window.location.href.includes("#id_token");
    }

    onUserLoaded(user) {
        this.setState({ isAuthenticated: true });     
        
        if (this.props.userLoaded !== undefined)
            this.props.userLoaded(user);
    }

    onUserUnloaded() {
        this.setState({ isAuthenticated: false });

        if (this.props.userUnLoaded !== undefined)
            this.props.userUnLoaded();
    }   

    signin() {
        this.userManager.signinRedirect().then(function () {
            console.log('signinRedirect ok');
        }).catch(function (err) {
            console.log('signinRedirect error:', err);
        });
    }

    render() {
        if (this.state.isAuthenticated) {
            return (this.props.children);
        }
        return <div onClick={this.signin}>{this.props.renderNotAuthenticated()}</div>;
    }
}

Authenticate.defaultProps = {
    OidcSettings: {},
    userUnLoaded: null,
    userLoaded: null,
    renderNotAuthenticated: null,
    checkAuthentication: null,
};

Authenticate.propTypes = {
    OidcSettings: propTypes.shape({
        /**
        * @property {string} OidcSettings.authority The URL of the OIDC/OAuth2 provider.
        */
        authority: propTypes.string.isRequired,
        /**
        * @property {string} OidcSettings.client_id  Your client application's identifier as registered with the OIDC/OAuth2 provider.
        */
        client_id: propTypes.string.isRequired,
        /**
        * @property {string} OidcSettings.redirect_uri The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
        */
        redirect_uri: propTypes.string.isRequired,
        /**
        * @property {string} OidcSettings.post_logout_redirect_uri The URL of the OIDC/OAuth2 provider.
        */
        post_logout_redirect_uri: propTypes.string.isRequired,
        /**
        * @property {string} OidcSettings.response_type The type of response desired from the OIDC/OAuth2 provider ( default: 'id_token').
        */
        response_type: propTypes.string.isRequired,
        /**
        * @property {string} OidcSettings.scope The scope being requested from the OIDC/OAuth2 provider (default: 'openid').
        */
        scope: propTypes.string.isRequired
    }).isRequired,
    /**
    * @property {func} userLoaded Raised when a user session has been established (or re-established), accepts one parameter 'user'.
    */
    userLoaded: propTypes.func,
    /**
    * @property {func} userUnLoaded Raised when a user session has been terminated.
    */
    userUnLoaded: propTypes.func,
    /**
    * @property {func} renderNotAuthenticated Renderprop used to render output when user is not authenticated
    */
    renderNotAuthenticated: propTypes.func.isRequired
};

export default Authenticate;