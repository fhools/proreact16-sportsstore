import React from "react";
import { useEffect } from "react";
import {Switch, Route, Redirect } from "react-router-dom";
import  { connect } from "react-redux";
import { loadData} from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";
import { addToCart, updateCartQuantity, removeFromCart, clearCart } from "../data/CartActionCreators";
import { CartDetails } from "./CartDetails";
const mapStateToProps = (dataStore) => ({
    ...dataStore
});

const mapDispatchToProps = {
    loadData, addToCart, updateCartQuantity, removeFromCart, clearCart
};

const filterProducts = (products = [], category) => 
    (!category || category === "All")
    ? products
    : products.filter(p => p.category.toLowerCase()  === category.toLowerCase());


export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    function (props) {
        useEffect(() => {
         props.loadData(DataTypes.CATEGORIES);
         props.loadData(DataTypes.PRODUCTS);
        });

        return (
            <Switch>
                <Route path="/shop/products/:category?" 
                    render={ (routeProps) =>
                         <Shop {...props } {...routeProps}
                            products={filterProducts(props.products, 
                                routeProps.match.params.category)} />} />
                <Route path="/shop/cart" 
                    render = { (routeProps) => 
                        <CartDetails {...props} {...routeProps} />} />
                <Redirect to="/shop/products" />
            </Switch>
        );
    });