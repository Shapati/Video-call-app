import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MeetingConsumer, MeetingProvider, useMeeting } from "@videosdk.live/react-sdk";
import JoinScreen from './Components/JoinScreen';
import MeetingView from './Components/MeetingView';


function App() {

  const API_URL = 'http://localhost:9000'

  const [token , setToken] = useState(null)
  const [meetingId , setMeetingId] = useState(null)
  const getMeetingId = async () =>{

    try{
      const token = await axios.get(`${API_URL}/get-token`)
      if(token.status ===  200){
         setToken(token.data.token)
         const meetingId = await axios.post(`${API_URL}/create-meeting` ,  { token: token.data.token})
         if(meetingId.status === 200) setMeetingId(meetingId.data.meetingId);
         else throw new Error('Meeting Id could not be created')
      }
    }
    catch(err){
        console.log(err)
    }
     
  }
  const getToken = async (meetId) =>{

    try{
      const token = await axios.get(`${API_URL}/get-token`)
      if(token.status ===  200){
         setToken(token.data.token)
         setMeetingId(meetId)
      }
    }
    catch(err){
        console.log(err)
    }
     
  }




  
  // const getMeetingId = async (token) => {
  //   try {
  //     const VIDEOSDK_API_ENDPOINT = `${API_URL}/create-meeting`;
  //     const options = {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token }),
  //     };
  //     const response = await fetch(VIDEOSDK_API_ENDPOINT, options)
  //       .then(async (result) => {
  //         const { meetingId } = await result.json();
  //         return meetingId;
  //       })
  //       .catch((error) => console.log("error", error));
  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  



  // const meetingId = await getMeetingId(token)

  return (
    <div className="App">
       {token && meetingId  ?  <MeetingProvider
         config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: false,
          name: "Nifemi",
        }}
        token={token}
       >
         <MeetingConsumer>
              {()=> <MeetingView meetingId={meetingId} />}
         </MeetingConsumer>
       </MeetingProvider> 

       : 
        <JoinScreen getMeetingId={getMeetingId} getToken={getToken} />
      }
    </div>
  );
}

export default App;
