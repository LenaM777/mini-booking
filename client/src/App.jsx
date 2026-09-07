import { useState, useEffect } from "react";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Міні-готель: Список кімнат</h1>
      <div style={{ display: "grid", gap: "15px" }}>
        {rooms.map((room) => (
          <div
            key={room.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>Кімната №{room.room_number}</h3>
            <p>
              <strong>Тип:</strong> {room.type}
            </p>
            <p>
              <strong>Ціна:</strong> {room.price} грн / ніч
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
