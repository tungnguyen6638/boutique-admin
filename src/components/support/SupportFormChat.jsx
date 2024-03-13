import { fetchData, fetchURL } from "../../ultilities/fetchUrl";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./SupportFormChat.module.css";
import openSocket from "socket.io-client";
import { useParams } from "react-router-dom";

const SupportFormChat = () => {
  const roomId = useParams();
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const socket = openSocket(fetchURL("SERVER_DOMAIN"), {
    transports: ["websocket"],
  });

  // Hàm gọi đến API để lấy thông tin room chat
  const getRoom = async () => {
    const res = await fetchData({
      url: fetchURL("GET_CHAT_ROOM", roomId.roomId),
    });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setMessages([...res.chatRoom.chatMessages]);
    }
  };

  useEffect(() => {
    // Lấy thông tin room chat
    getRoom();

    // Lắng nghe sự kiện chat của socket.io
    socket.on("chat", (c) => {
      setError(null);

      // Các sự kiện của socket
      if (c.action === "res-to-admin") {
        if (c.room._id === roomId.roomId) {
          setMessages([...c.room.chatMessages]);
        }
      }
      if (c.action === "res-to-all") {
        if (c.room._id === roomId.roomId) {
          setMessages([...c.room.chatMessages]);
        }
      }
      if (c.action === "res-delete-to-all") {
        setError("Room chat has been terminated");
      }
    });
  }, []);

  useEffect(() => {
    // Effect để scroll tới tin nhắn cuối cùng
    const last = document.getElementsByClassName("last") || null;
    if (last.length !== 0) {
      last[0].scrollIntoView();
    }
  }, [messages]);

  const adminChatHandler = (e) => {
    e.preventDefault();
    const message = e.target.message.value;

    // Emit sự kiện tới server để push tin nhắn vào room chat
    socket.emit("chat", {
      action: "req-from-admin",
      message: message,
      roomId: roomId.roomId,
    });

    e.target.message.value = "";
  };

  return (
    <>
      <div className="my-5 p-4 rounded border border-warning">
        <main className={`${styles["main"]} vh-90`}>
          <div className="my-3 d-flex flex-column gap-3">
            {error ? (
              <p className="text-danger">{error}</p>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={message._id}
                    className={`${styles["msg"]} ${
                      message.role !== "client"
                        ? "rounded align-self-end me-4 bg-warning"
                        : "rounded align-self-start ms-4 bg-secondary"
                    } ${index === messages.length - 1 && "last"}`}
                  >
                    <p
                      className={`p-2 mb-0 ${
                        message.role === "client" ? "text-white" : ""
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </main>

        <form className="input-group mt-2" onSubmit={adminChatHandler}>
          <input
            type="text"
            className="form-control"
            name="message"
            placeholder="Enter your message..."
            autoComplete="off"
          />
          <button className="btn btn-warning">Send</button>
        </form>
      </div>
    </>
  );
};

export default SupportFormChat;
