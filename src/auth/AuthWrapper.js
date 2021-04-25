import { AuthContext } from "./AuthContext";
import {useContext } from "react";
export const authWrapper = (WrappedComponent) => 
    function (props) {
        const authContext = useContext(AuthContext);
        return (
            <WrappedComponent {...props} {...authContext} />
        )
    }