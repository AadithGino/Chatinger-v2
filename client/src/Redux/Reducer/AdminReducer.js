import { ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS } from "../Constants/adminConstants";

export const adminLoginReducer  = (state={},action)=>{
    switch (action.type) {
        case ADMIN_LOGIN_REQUEST:
            return {loading:true}

        case ADMIN_LOGIN_SUCCESS:
            return {loading:false,adminData:action.payload}
        
        case ADMIN_LOGIN_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state;
    }
}