import { REMOVE_VIDEO_CALL_ID, SET_VIDEO_CALL_ID } from "../Constants/videoCallConstant";

export const videoCallIdReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_VIDEO_CALL_ID:
            console.log("CALL ID IS HERE"+action.payload);
            return { roomId: action.payload }
            
        case REMOVE_VIDEO_CALL_ID:
            return { roomId: false }
        default:
            return state;
    }
}