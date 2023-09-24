import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import Layout from '../Layout/Layout'
const Room = () => {
    const {id}=useParams()
    const meeting=async(element)=>{
        const appID=Number(process.env.REACT_APP_appID)
        const serverSecret=process.env.REACT_APP_serverSecret
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,id,Date.now().toString(),"User")
        const zc=ZegoUIKitPrebuilt.create(kitToken)
        zc.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.OneONoneCall
            },

        })
    }
  return (
    <Layout>
        <div ref={meeting}/>
    </Layout>
  )
}

export default Room