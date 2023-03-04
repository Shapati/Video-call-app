import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";
import ParticipantsView from "./ParticipantsView";
import { useState } from "react";
const MeetingView = ({ meetingId }) => {
  const [joined, setJoined] = useState(false);

  
  const { localParticipant, participants, join } = useMeeting();
  const joinMeeting = () => {
    setJoined(true);
    join();
  };
  return (
    <div>
      <p>meeting Id: {meetingId}</p>

      {joined ? (
        <>
          {[...participants.keys()].map((k) => (
            <div style={{ display: "flex" }}>
              <ParticipantsView key={k} participantId={k} />
            </div>
          ))}
        </>
      ) : (
        <>
          <button onClick={joinMeeting}>Join</button>
        </>
      )}
    </div>
  );
};

export default MeetingView;
