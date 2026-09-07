import db from './db.js';

console.log('Початок заповнення бази даних...');

// Очищення старих даних перед заповненням (тільки для тестових цілей)
db.prepare('DELETE FROM bookings').run();
db.prepare('DELETE FROM rooms').run();
db.prepare('DELETE FROM users').run();

// Створення тестових користувачів
const insertUser = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
insertUser.run('Олена', 'olena@example.com');
insertUser.run('Іван', 'ivan@example.com');

// Створення 5 кімнат
const insertRoom = db.prepare('INSERT INTO rooms (room_number, type, price) VALUES (?, ?, ?)');
insertRoom.run('101', 'Standard Single', 1000);
insertRoom.run('102', 'Standard Double', 1500);
insertRoom.run('201', 'Deluxe Double', 2200);
insertRoom.run('202', 'Suite', 3500);
insertRoom.run('301', 'Presidential Suite', 5000);

console.log('Базу даних успішно заповнено!');