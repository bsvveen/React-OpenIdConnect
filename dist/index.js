(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["react-openidconnect"] = factory();
	else
		root["react-openidconnect"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return webpackJsonpreact_openidconnect([1],{

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_oidc_client__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_oidc_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_oidc_client__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * @render react
 * @name Authenticate
 * @description OpenId Connect based Authentication Component
 * @example
 * <Authenticate OidcSettings={this.OidcSettings} userLoaded={this.userLoaded} userunLoaded={this.userUnLoaded} renderNotAuthenticated={this.NotAuthenticated}>
      <div>If you see this you are authenticated.</div>
   </Authenticate>
 */

var Authenticate = function (_Component) {
    _inherits(Authenticate, _Component);

    function Authenticate(props) {
        _classCallCheck(this, Authenticate);

        var _this = _possibleConstructorReturn(this, (Authenticate.__proto__ || Object.getPrototypeOf(Authenticate)).call(this, props));

        _this.signin = _this.signin.bind(_this);
        _this.onUserLoaded = _this.onUserLoaded.bind(_this);
        _this.state = { isAuthenticated: false, isLoading: false };
        return _this;
    }

    _createClass(Authenticate, [{
        key: 'UNSAFE_componentWillMount',
        value: function UNSAFE_componentWillMount() {
            var _this2 = this;

            this.userManager = new __WEBPACK_IMPORTED_MODULE_2_oidc_client__["UserManager"](this.props.OidcSettings);
            this.userManager.events.addUserLoaded(this.onUserLoaded);
            this.userManager.events.addUserUnloaded(this.onUserUnloaded);

            this.userManager.getUser().then(function (user) {
                if (user !== null && user !== undefined) {
                    _this2.onUserLoaded(user);
                } else if (_this2.isSuccessfullyAuthenticated()) {
                    _this2.setState({ isLoading: true });
                    _this2.userManager.signinRedirectCallback().then(function () {
                        window.history.replaceState({}, "", "/");
                    }).catch(function (err) {
                        console.log("Error signinRedirectCallback: ", err);
                    });
                }
            });
        }
    }, {
        key: 'isSuccessfullyAuthenticated',
        value: function isSuccessfullyAuthenticated() {
            if (this.props.checkAuthentication !== undefined) {
                return this.props.checkAuthentication();
            }

            return window.location.href.includes("#id_token");
        }
    }, {
        key: 'onUserLoaded',
        value: function onUserLoaded(user) {
            this.setState({ isAuthenticated: true });

            if (this.props.userLoaded !== undefined) this.props.userLoaded(user);
        }
    }, {
        key: 'onUserUnloaded',
        value: function onUserUnloaded() {
            this.setState({ isAuthenticated: false });

            if (this.props.userUnLoaded !== undefined) this.props.userUnLoaded();
        }
    }, {
        key: 'signin',
        value: function signin() {
            this.userManager.signinRedirect().then(function () {
                console.log('signinRedirect ok');
            }).catch(function (err) {
                console.log('signinRedirect error:', err);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.isAuthenticated) {
                return this.props.children;
            } else if (this.state.isLoading) {
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                    'div',
                    null,
                    this.props.renderLoading()
                );
            }
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
                'div',
                null,
                this.props.renderNotAuthenticated({ onSignIn: this.signin })
            );
        }
    }]);

    return Authenticate;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Authenticate.defaultProps = {
    OidcSettings: {},
    userUnLoaded: null,
    userLoaded: null,
    renderLoading: null,
    renderNotAuthenticated: null,
    checkAuthentication: null
};

Authenticate.propTypes = {
    OidcSettings: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
        /**
        * @property {string} OidcSettings.authority The URL of the OIDC/OAuth2 provider.
        */
        authority: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        /**
        * @property {string} OidcSettings.client_id  Your client application's identifier as registered with the OIDC/OAuth2 provider.
        */
        client_id: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        /**
        * @property {string} OidcSettings.redirect_uri The redirect URI of your client application to receive a response from the OIDC/OAuth2 provider.
        */
        redirect_uri: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        /**
        * @property {string} OidcSettings.post_logout_redirect_uri The URL of the OIDC/OAuth2 provider.
        */
        post_logout_redirect_uri: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        /**
        * @property {string} OidcSettings.response_type The type of response desired from the OIDC/OAuth2 provider ( default: 'id_token').
        */
        response_type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
        /**
        * @property {string} OidcSettings.scope The scope being requested from the OIDC/OAuth2 provider (default: 'openid').
        */
        scope: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired
    }).isRequired,
    /**
    * @property {func} userLoaded Raised when a user session has been established (or re-established), accepts one parameter 'user'.
    */
    userLoaded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    /**
    * @property {func} userUnLoaded Raised when a user session has been terminated.
    */
    userUnLoaded: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    /**
     * @property {func} renderLoading Renderprop used to render output when user's authentication is being processed 
     */
    renderLoading: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    /**
    * @property {func} renderNotAuthenticated Renderprop used to render output when user is not authenticated
    */
    renderNotAuthenticated: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func.isRequired,
    /**
     * @property {func} checkAuthentication Overwrite the authentication check method
     */
    checkAuthentication: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
    /**
     * @property {node} children If present overwrite the isAuthenticated renderer 
     */
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.oneOfType([__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node), __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.node]).isRequired
};

/* harmony default export */ __webpack_exports__["default"] = (Authenticate);

/***/ })

},[5]);
});