import { ActionTypes } from "./Types";
import { RestDataSource } from "./RestDataSource";

const dataSource = new RestDataSource();
// Action creator to load a data type
export const loadData = (dataType) => ({
    // type field is the only requirement for an action creator
    type: ActionTypes.DATA_LOAD,
    payload: dataSource.GetData(dataType).then(response => ({dataType, data: response.data}))
});
