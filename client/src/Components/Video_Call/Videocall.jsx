import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { useSelector } from 'react-redux';
function Videocall() {
    const {roomId} = useSelector((state)=>state.videoCallReducer)
    console.log(roomId);
    const userdata = useSelector((state) => state.loginReducer.userdata);
    const myMeeting = async (Element) => {
        const appID = 1207140505;
        const serverSecret = "b59fa3aeed116f6b878f1620b5c78647";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, Date.now().toString(),userdata.firstname );
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: Element,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showTextChat: false,
            showLeavingView:false,
            showPreJoinView: false,
            branding: "CHATINGER"

        })
    };
    return (
        <div>
            <div ref={myMeeting} />
        </div>
    )
}

export default Videocall