import React from 'react'
import { useParams } from 'react-router-dom'
import {ZegoUIKitPrebuilt} from "@zegocloud/zego-uikit-prebuilt"
import Layout from '../Layout/Layout'
const Room = () => {
    const {id}=useParams()
    const meeting=async(element)=>{
        const appID=214113188
        const serverSecret="7604664862c7dd8f30e5e26ac303833b"
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