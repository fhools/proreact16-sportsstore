import Axios from "axios";
import { AuthContext } from "./AuthContext";
import { authUrl } from "../data/Urls";
import { useState } from "react";
export function AuthProviderImpl(props) {

    var [authenticationState, setAuthenticationState ] = useState({ isAuthenticated: false, 
        webToken: null 
    });
    const authenticate = (credentials) => {
        return Axios.post(authUrl, credentials).then(response => {
            if (response.data.success === true) {
                setAuthenticationState({
                    isAuthenticated: true,
                    webToken: response.data.token
                });
                return true;
            } else {
                throw new Error("Invalid Credentials");
            }
        });
    }

    const signout = () => {
        setAuthenticationState({
            isAuthenticated: false,
            webToken: null
        });
    }

    return (
     <AuthContext.Provider value = { {...authenticationState,
        authenticate: authenticate, signout: signout}}>
        { props.children }
     </AuthContext.Provider>
    );
}
