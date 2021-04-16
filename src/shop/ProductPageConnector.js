import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setPageSize, setSortKey } from "../data/ActionCreators";

const mapStateToProps = (dateStore) => dateStore; 
const mapDispatchToProps = { setPageSize, setSortKey };

const mergeProps = (dataStore, actionCreators, router) => ({
    ...dataStore, ...router, ...actionCreators,
    currentPage: Number(router.match.params.page),
    pageCount: 
    Math.ceil((dataStore.products_total 
                || dataStore.pageSize || 5)/(dataStore.pageSize || 5)),
    navigateToPage: (page) => router.history.push(`/shop/products/${router.match.params.category}/${page}`),
})

export const ProductPageConnector = (PageComponent) =>
    withRouter(
        connect(mapStateToProps, mapDispatchToProps, mergeProps)(PageComponent))