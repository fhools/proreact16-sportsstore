import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./OrdersConnector";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToggleLink } from "../ToggleLink";
import { ConnectedProducts } from "./ProductsConnector";
import { ProductEditor } from "./ProductEditor";
import { ProductCreator } from "./ProductCreator";
import { AuthPrompt } from "../auth/AuthPrompt";
import { authWrapper } from "../auth/AuthWrapper";
import { setContext } from "@apollo/client/link/context";
export const Admin = authWrapper(
function (props) {
    var httpLink  = createHttpLink({
        uri: GraphQlUrl
    });

    var authLink = setContext((_, {headers}) => {
        return {
            headers: { 
                ...headers,
                authorization: `Bearer<${props.webToken}>`
            }
        }
    });

    var client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    });

    return (
        <ApolloProvider client= { client }>
            <div className="container-fluid">
                <div className="row">
                    <div className="col bg-info text-white">
                        <div className="navbar-brand">SPORTS STORE</div>
                    </div>
                </div>
            </div>
            <div className= "row">
                <div className="col-3 p-2">
                    <ToggleLink to="/admin/orders">Orders</ToggleLink>
                    <ToggleLink to="/admin/products">Products</ToggleLink>
                    { props.isAuthenticated &&
                        <button onClick = { props.signout }
                            className="btn btn-block btn-secondary m-2 fixed-bottom col-3">
                            Log Out
                        </button>}
                </div>
                <div className="col p-2">
                    <Switch>
                        { !props.isAuthenticated && <Route component= { AuthPrompt } />}
                        <Route path="/admin/orders" component={OrdersConnector}/>
                        <Route path="/admin/products/create" component={ProductCreator}/>
                        <Route path="/admin/products/:id" component={ProductEditor} />
                        <Route path="/admin/products" component={ConnectedProducts} />
                        <Redirect to="/admin/orders" />
                    </Switch>
                </div>
            </div>
        </ApolloProvider>
    )
}
)