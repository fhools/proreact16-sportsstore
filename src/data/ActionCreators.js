import { ActionTypes } from "./Types";
import {data as phData} from "./placeholderData";


// Action creator to load a data type
export const loadData = (dataType) => ({
    // type field is the only requirement for an action creator
    type: ActionTypes.DATA_LOAD,
    payload: {
        dataType: dataType,
        data: phData[dataType]
    }
});
