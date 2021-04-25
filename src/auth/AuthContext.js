import React from "react";

export const AuthContext = React.createContext({
    isAuthenticationed: false,
    webToken: null,
    authenticated: (username, password) => {},
    signout: () => {}
});

