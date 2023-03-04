import React, { useState } from 'react'

const JoinScreen = ({getMeetingId , getToken}) => {
    const [meetingId , setMeetingId] = useState('')
  return (
    
    <div>
        <input type="text" onChange={(e)=>setMeetingId(e.target.value)} />
        <button onClick={()=>getToken(meetingId)} >Join Metting</button>
        <button onClick={getMeetingId}>Create Meeting</button>
    </div>
  )
}

export default JoinScreen