import React, {useEffect} from "react";
import { DataTypes } from "./Types";

export function DataGetter(props) {
    const { category , page }  = props.match.params;
    const { pageSize } = props;
    const { sortKey } = props;
    const { product_params } = props;
    const { loadData } = props;
    useEffect(() => {
        function getData() {    
            const dsData = product_params || {};
            const rtData = {
                _limit: pageSize || 5,
                _sort: sortKey || "name",
                _page: page || 1,
                category_like: (category || "") === "all" ?
                    "" : category
            }
    
            if (Object.keys(rtData).find(key => dsData[key] !== rtData[key])) {
                loadData(DataTypes.PRODUCTS, rtData);
            }
        }
        getData();
    },[category, page ,pageSize, sortKey, product_params, loadData]);

    

    return (
        <React.Fragment>{props.children}</React.Fragment>
    )
}
