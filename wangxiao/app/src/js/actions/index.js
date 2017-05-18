import {get, post} from '../utils/fetch';

export const LOAD_BANNERS = "LOAD_BANNERS"
    , LOAD_MARKETS="LOAD_MARKETS"
    , LOAD_DESCITIES = "LOAD_DESCITIES"
    , LOAD_PROMOTION = "LOAD_PROMOTION"
    , LOAD_PID = "LOAD_PID"
    , LOAD_PRODUCT = "LOAD_PRODUCT"
    , GET_MORE='GET_MORE'
    , TO_SHARE = "TO_SHARE"
    , DES_CLICK = 'DES_CLICK'
    , GETTABNAME_DATA = "GETTABNAME_DATA"
    , GETTABCONTENT_DATA = "GETTABCONTENT_DATA"
    , EXPAND_HANDLE='EXPAND_HANDLE'
    , LOAD_DES='LOAD_DES';


export const loadBanners = (epcode) => {

        return {
            type: LOAD_BANNERS,
            payload: get(`api/Market/GetMarketPositions?type=${epcode}`)
        }
    },


    loadMarkets = (epcode) => {
        return {
            type: LOAD_MARKETS,
            payload: get(`api/Market/GetMarketPositions?type=${epcode}`)
        }
    },


    loadDesCities = () => {
        
        return {
            type: LOAD_DESCITIES,
            payload: get("api/City/GetDestinationList")
        }
    },


    //首页推广位
    loadPromotion = () => {
        return {
            type: LOAD_PROMOTION,
            payload: get(`api/NavigationBar/GetNavigationBar`)
        }
    },


    //产品类型
    loadPID = () => {
        return {
            type: LOAD_PID,
            payload: get("api/Market/GetMarketProductTypes")
        }
    },


    loadProduct = (pid) => {
        return {
            type: LOAD_PRODUCT,
            payload: get(`api/Market/GetMarketProducts?productType=${pid}`)
        }
    },

    loadDestinationList=()=>{
         return {
            type: LOAD_DES,
            payload: get("api/City/GetDestinationList")
        }
    },

    getMore=(data)=>{
        return {
            type: GET_MORE,
            data
        }
    },


    share = (data) => {
        return {
            type: TO_SHARE,
            data
        }
    },


    destinationCityClick = (data) => {
        return {
            type: DES_CLICK,
            data
        }
    },


    tabName = () => {
        return {
            type: GETTABNAME_DATA,
            payload: get(`api/Market/GetMarketProductTypes`)
        }
    },

    tabCon = (type) => {
        return {
            type: GETTABCONTENT_DATA,
            payload: get(`api/Market/GetMarketProducts?productType=${type}`)
        }
    },


    expandHandle=(data)=>{
        return {
            type: EXPAND_HANDLE,
            data
        }
    },
    tabChange=()=>{
         return {
            type: TAB_CHANGE,
            data
        }
    };







