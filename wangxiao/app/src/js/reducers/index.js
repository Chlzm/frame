import {
    LOAD_BANNERS
    , LOAD_MARKETS
    , LOAD_DESCITIES
    , LOAD_PROMOTION
    , LOAD_PID
    , LOAD_PRODUCT
    , TO_SHARE
    , DES_CLICK
    , GETTABNAME_DATA
    , GETTABCONTENT_DATA
    , EXPAND_HANDLE
    , GET_MORE
    , LOAD_DES
} from "../actions/index"

const initState = {
    productData: null,
    payOrder: [],
    tabName: null
};

export const indexReducer = (state = {}, action) => {
    switch (action.type) {
        case `${LOAD_MARKETS}_SUCCESS`:
            return Object.assign({}, state, action.payload.Data);
            break;
        case `${LOAD_DESCITIES}_SUCCESS`:
            return Object.assign({}, state, action.payload.Data);
            break;
        case `${LOAD_PROMOTION}_SUCCESS`:
            return Object.assign({}, state, action.payload.Data);
            break;
        case `${LOAD_PID}_SUCCESS`:
            return Object.assign({}, state, action.payload.Data);
            break;
        case `${LOAD_PRODUCT}_SUCCESS`:
            return Object.assign({}, state, action.payload.Data);
            break;
        case `${GETTABNAME_DATA}_SUCCESS`:
            return Object.assign({}, state, {
                tabName: action.payload.Data
            });
        case `${LOAD_DES}_SUCCESS`:
            return Object.assign({}, state, action.payload.Data);
        case `${GETTABCONTENT_DATA}_SUCCESS`:
            return Object.assign({}, state, {
                tabCon: action.payload.Data
            });
        case TO_SHARE:
            return Object.assign({}, state, action.data);
            break;
        case DES_CLICK:
            return Object.assign({}, state, {desShow: action.data});
            break;
        case EXPAND_HANDLE:
            return Object.assign({}, state, {expandShow: action.data});
            break;
        case GET_MORE:
            return Object.assign({}, state, {more: action.data});
            break;
        default :
            return state;
    }
}

