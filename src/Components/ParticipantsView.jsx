import { useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import React, { useMemo } from 'react'
import { useEffect , useRef } from 'react';
import ReactPlayer from 'react-player';
const ParticipantsView = ({participantId}) => {
 /** Define Refs*/
 const webcamRef = useRef(null);
 const micRef = useRef(null);

 /** useParticipant Hooks which accept `participantId`
   as parameter then return participant properties such as displayName, webcamOn, micOn etc.  */
 const {
   displayName,
   webcamStream,
   micStream,
   webcamOn,
   micOn,
   isActiveSpeaker,
   isLocal,
 } = useParticipant(participantId);

 const { leave, toggleMic, toggleWebcam , enableScreenShare } = useMeeting();

 const videoStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

 useEffect(() => {
   if (webcamRef.current) {
     if (webcamOn) {
       const mediaStream = new MediaStream();
       mediaStream.addTrack(webcamStream.track);

       webcamRef.current.srcObject = mediaStream;
       webcamRef.current
         .play()
         .catch((error) =>
           console.error("videoElem.current.play() failed", error)
         );
     } else {
       webcamRef.current.srcObject = null;
     }
   }
 }, [webcamStream, webcamOn]);

 useEffect(() => {
   if (micRef.current) {
     if (micOn) {
       const mediaStream = new MediaStream();
       mediaStream.addTrack(micStream.track);

       micRef.current.srcObject = mediaStream;
       micRef.current
         .play()
         .catch((error) =>
           console.error("videoElem.current.play() failed", error)
         );
     } else {
       micRef.current.srcObject = null;
     }
   }
 }, [micStream, micOn]);

 return (
   <>

<div>
      <button onClick={leave}>Leave</button>
      <button onClick={toggleMic}>toggleMic</button>
      <button onClick={toggleWebcam}>toggleWebcam</button>
      <button onClick={enableScreenShare}>Share screen</button>
    </div>

    {micOn && micRef && <audio ref={micRef} autoPlay muted={isLocal} />}
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls={true}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"500px"}
          width={"500px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
   </>
 );
}

export default ParticipantsView