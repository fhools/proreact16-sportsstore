import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { GraphQlUrl } from "../data/Urls";
import { OrdersConnector } from "./OrdersConnector";

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
                <div className="col p-2">
                    <OrdersConnector />
                </div>
            </div>
        </ApolloProvider>
    )
}