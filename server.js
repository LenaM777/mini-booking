import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Отримати список усіх кімнат
app.get('/api/rooms', (req, res) => {
  try {
    const rooms = db.prepare('SELECT * FROM rooms').all();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати інформацію про конкретну кімнату за її ID
app.get('/api/rooms/:id', (req, res) => {
  try {
    const room = db.prepare('SELECT * FROM rooms WHERE id = ?').get(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Кімнату не знайдено' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створити нове бронювання
app.post('/api/bookings', (req, res) => {
  const { user_id, room_id, start_date, end_date } = req.body;

  if (!user_id || !room_id || !start_date || !end_date) {
    return res.status(400).json({ error: 'Усі поля є обов’язковими' });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO bookings (user_id, room_id, start_date, end_date)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(user_id, room_id, start_date, end_date);

    res.status(201).json({
      id: result.lastInsertRowid,
      user_id,
      room_id,
      start_date,
      end_date
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримати всі бронювання з деталями про юзера та кімнату
app.get('/api/bookings', (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT 
        bookings.id,
        users.name AS user_name,
        rooms.room_number,
        rooms.type AS room_type,
        bookings.start_date,
        bookings.end_date
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN rooms ON bookings.room_id = rooms.id
    `).all();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});