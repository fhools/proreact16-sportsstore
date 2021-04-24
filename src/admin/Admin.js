import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./OrdersConnector";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToggleLink } from "../ToggleLink";
import { ConnectedProducts } from "./ProductsConnector";
import { ProductEditor } from "./ProductEditor";
import { ProductCreator } from "./ProductCreator";

const graphQlClient = new ApolloClient({
    uri: GraphQlUrl,
    cache: new InMemoryCache()
});

export function Admin(props) {
    return (
        <ApolloProvider client= { graphQlClient }>
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
                </div>
                <div className="col p-2">
                    <Switch>
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