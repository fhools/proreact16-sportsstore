import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();
// Action creator to load a data type
export const loadData = (dataType, params) => ({
    // type field is the only requirement for an action creator
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType, params).then(response =>
         ({ dataType,
            data: response.data,
            total: Number(response.headers["x-total-count"]),
            params}))
});


export const setPageSize = (newSize) =>
    ({ type: ActionTypes.DATA_SET_PAGESIZE, payload: newSize });
export const setSortKey = (newSortKey) =>
    ({ type: ActionTypes.DATA_SET_SORT_KEY, payload: newSortKey });