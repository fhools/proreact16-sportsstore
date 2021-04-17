import React from "react";
import { useEffect } from "react";
import {Switch, Route, Redirect } from "react-router-dom";
import  { connect } from "react-redux";
import { loadData, placeOrder } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";
import { addToCart, updateCartQuantity, removeFromCart, clearCart } from "../data/CartActionCreators";
import { CartDetails } from "./CartDetails";
import { DataGetter } from "../data/DataGetter";
import { Checkout } from "./Checkout";
import { Thanks } from "./Thanks";

const mapStateToProps = (dataStore) => ({
    ...dataStore
});

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart, placeOrder
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
export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    function (props) {
        const { loadData } = props;
        useEffect(() => {
         loadData(DataTypes.CATEGORIES);
        }, [loadData]);

        return (
            <Switch>
                <Redirect from="/shop/products/:category"
                    to="/shop/products/:category/1" exact= {true} />
                <Route path={"/shop/products/:category/:page"}
                    render={ (routeProps) =>
                        <DataGetter {...props} {...routeProps}>
                            <Shop {...props } {...routeProps} />
                        </DataGetter>
                    } />
                <Route path="/shop/cart" 
                    render = { (routeProps) => 
                        <CartDetails {...props} {...routeProps} />} />
                <Route path="/shop/checkout" render= { routeProps =>
                    <Checkout {...props} {...routeProps} /> } />
                <Route path="/shop/thanks" render={ routeProps => 
                    <Thanks {...props} {...routeProps} /> } />
                <Redirect to="/shop/products/all/1" />
            </Switch>
        );
    });