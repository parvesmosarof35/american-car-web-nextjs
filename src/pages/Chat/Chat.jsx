import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCreateMessageMutation } from "../../Redux/api/Chat/createChatApi";
//get plate id from url


export default function Chat() {
  const { id: receiverId } = useParams();
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("plate");
  const plateId = searchParams.get("plateId");
  const navigate = useNavigate();
  const location = useLocation();


  const [createMessage] = useCreateMessageMutation();
  const [loading, setLoading] = useState(true);

  const hasRunRef = useRef(false); // <--- track if already run

  useEffect(() => {
    if (hasRunRef.current) return; // prevent running twice
    hasRunRef.current = true;

    const createChannel = async () => {
      try {
        const initialFormData = new FormData();
        // Prefer message passed via navigation state (PlateDetails) first
        let stateMsg = location?.state?.enquiryMessage;
        if (stateMsg) {
          try {
            stateMsg = String(stateMsg);
          } catch {
            // ignore coercion issues
          }
        }

        // Otherwise prefer enquiryDraft message from localStorage if present
        let draftMsg = undefined;
        try {
          const raw = localStorage.getItem("enquiryDraft");
          if (raw) {
            const draft = JSON.parse(raw);
            // Only use draft if plate matches (when provided)
            if (!draft?.plateReg || draft.plateReg === registrationId) {
              draftMsg = draft?.message;
            }
          }
        } catch {
          // ignore parse errors
        }
        const chosen = stateMsg && String(stateMsg).trim().length > 0 ? stateMsg : draftMsg;
        const initialMessage = (chosen && String(chosen).trim().length > 0)
          ? String(chosen)
          : `Is this plate ${registrationId} available?`;

        initialFormData.append("message", initialMessage);
        initialFormData.append("plateId", plateId);

        const res = await createMessage({
          id: receiverId,
          formData: initialFormData,
        }).unwrap();

        const channel = res.data.channel;
        if (channel?.channelName) {
          // Clear draft after message is sent and channel is created
          try { localStorage.removeItem("enquiryDraft"); } catch { /* ignore */ }
          navigate(
            `/userdashboard/message-center?${channel.channelName}`,
            { state: { registrationId } }
          );
        }
      } catch (err) {
        console.error("Failed to create/get channel:", err);
      } finally {
        setLoading(false);
      }
    };

    createChannel();
  }, [receiverId, registrationId, createMessage, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {loading ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Creating chat channel...</h1>
          <p className="text-gray-500">Please wait while we set things up.</p>
        </>
      ) : (
        <p className="text-red-500">
          Couldn’t create channel. Please try again.
        </p>
      )}
    </div>
  );
}
