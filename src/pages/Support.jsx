import { useState } from "react";
import { fetchData, fetchURL } from "../ultilities/fetchUrl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import openSocket from "socket.io-client";

const Support = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const socket = openSocket(fetchURL("SERVER_DOMAIN"), {
    transports: ["websocket"],
  });

  // Hàm gọi API để lấy toàn bộ roomchat hiện có
  const getRooms = async () => {
    const res = await fetchData({
      url: fetchURL("GET_CHAT_ROOMS"),
    });

    if (res.hasError) {
      setError(res.message);
    } else {
      setError(null);
      setChatRooms(res.chatRooms);
    }
  };

  useEffect(() => {
    getRooms();

    // Lắng nghe các sự kiện chat trong socket.io
    socket.on("chat", (s) => {
      if (s.action === "res-to-admin") {
        setChatRooms((prev) => [...prev, s.room]);
      }
      if (s.action === "res-delete-to-all") {
        getRooms();
      }
    });
  }, []);

  const answerChatHandler = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <table className="table mt-4">
        <thead className="table-warning">
          <tr>
            <th>Room Id</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          {error && <p className="text-danger">{error}</p>}
          {chatRooms.length !== 0 &&
            chatRooms.map((room) => (
              <tr key={room._id}>
                <td>{room._id}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      answerChatHandler(room._id);
                    }}
                    className="btn btn-success"
                  >
                    Answer
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Support;
