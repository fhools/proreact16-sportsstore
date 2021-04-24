import { graphql} from '@apollo/react-hoc';
import {flowRight as compose} from 'lodash';
import { ordersSummaryQuery } from "./clientQueries"
import { OrdersTable } from "./OrdersTable";
import { shipOrder } from "./clientMutations";

const vars = {
    onlyShipped: false, page: 1, pageSize: 10, sort: "id"
}

export const OrdersConnector = compose(
    graphql(ordersSummaryQuery,
    {
        options: (props) => ({ variables: vars }),
        // these are props that get set
        // in the targetcomponent
        // props is our callback that is passed data from graphql client
        // which was received from graphql server.
        // the data pass in is the result of the graphql query
        // we package up that data and also create dispatchers 
        // used to refetch data based on new page or sort key updates.
        props: ({data: { loading, orders, refetch}}) => ({
            totalSize: loading ? 0 : orders.totalSize,
            orders: loading ? [] : orders.orders,
            currentPage: vars.page,
            pageCount: loading ? 0 : Math.ceil(orders.totalSize / vars.pageSize),
            navigateToPage: (page) => { vars.page = Number(page); refetch(vars)},
            pageSize: vars.pageSize,
            setPageSize: (size) => { vars.pageSize = Number(size); refetch(vars)},
            sortKey: vars.sort,
            setSortProperty: (key) => { vars.sort = key; refetch(vars)}
        })
    }),
    graphql(shipOrder,
    {
        props: ({ mutate }) => ({
            toggleShipped: (id, shipped) => mutate({ variables: {id, shipped }})
        })
    })
)(OrdersTable)