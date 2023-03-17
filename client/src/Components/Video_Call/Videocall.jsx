import React, { useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { removeVideoIdAction } from '../../Redux/Actions/UserActions/UserHomeAction';
function Videocall() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { roomId } = useSelector((state) => state.videoCallReducer)
    console.log(roomId);
    const userdata = useSelector((state) => state.loginReducer.userdata);
    useEffect(() => {
        if (roomId == false) {
            navigate("/home")
        }
    }, [roomId])
    const myMeeting = async (Element) => {
        const appID = 1071076159;
        const serverSecret = "2b5128303ed0820b899d6cb9f1967bdb";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(), userdata.firstname);
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: Element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showTextChat: false,
            showLeavingView: false,
            showPreJoinView: false,
            branding: "CHATINGER",
            onLeaveRoom: () => {
                dispatch(removeVideoIdAction())
                navigate("/home")
            },
            onUserLeave: () => {
                dispatch(removeVideoIdAction())
                navigate("/home")
            }

        })

    };
    return (
        <div>
            <div ref={myMeeting} />
        </div>
    )
}

export default Videocall