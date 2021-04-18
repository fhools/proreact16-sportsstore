import React, { Component } from "react";
import { useEffect } from "react";
import {Switch, Route, Redirect } from "react-router-dom";
import  { connect } from "react-redux";
import * as ShopActions from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";
import * as CartActions from "../data/CartActionCreators";
import { CartDetails } from "./CartDetails";
import { DataGetter } from "../data/DataGetter";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";
import { render } from "@testing-library/react";

const mapDispatchToProps = {
    ...ShopActions, ...CartActions
};

// const filterProducts = (products = [], category) => 
//     (!category || category === "All")
//     ? products
//     : products.filter(p => p.category.toLowerCase()  === category.toLowerCase());


// From react-router documents.
/* There are 3 ways to render components with Route, ordered from lowest to
    highest precedence.
    - Route component prop
        <Route path="/foo" component={Foo}>
    - Route render prop
        Use this if you have an inline function
        <Route path="/foo" render={() => <Foo/>}>
    - Route  children prop
        <Route path="/foo" children={(match) => <Foo className={match? "active":}/>}>

    Each of the 3 methods will be passed the following props:
    routeProp.match
    routeProp.history
    routeProp.location
*/
export const ShopConnector = connect(ds => ds, mapDispatchToProps)(
    function Component(props) {
        const { loadData } = props;
        useEffect(() => {
         loadData(DataTypes.CATEGORIES);
        }, [loadData]);
        const selectComponent = (routeProps) => {
            const wrap = (MyComponent, Content) => {

            return (
                <MyComponent {...props} {...routeProps}>
                    { Content && wrap(Content)}
                </MyComponent>
            );
            }
            switch (routeProps.match.params.section) {
                case "products":
                    return wrap(DataGetter, Shop);
                case "cart":
                    return wrap(CartDetails);
                case "checkout":
                    return wrap(Checkout);
                case "thanks":
                    return wrap(Thanks);
                default:
                    return <Redirect to="/shop/products/all/1" />
            }
        }

        
        return (
            <Switch>
                <Redirect from="/shop/products/:category"
                    to="/shop/products/:category/1" exact={true} />
                <Route path={"/shop/:section?/:category?/:page?"}
                    render={ (routeProps) => selectComponent(routeProps) } />
            </Switch>
        );
        }

    )