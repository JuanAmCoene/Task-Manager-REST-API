# 📝 Task Manager REST API

A full-stack Task Manager application demonstrating RESTful API principles with a clean, modern interface. Built with Node.js, Express, and vanilla JavaScript.

![Project Preview](https://img.shields.io/badge/Status-Complete-success)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)

## 🚀 Features

- **Complete CRUD Operations**: Create, Read, Update, and Delete tasks
- **RESTful API Design**: Following REST principles with proper HTTP methods
- **Clean Architecture**: Organized code structure with separation of concerns
- **Modern UI**: Responsive design with smooth animations
- **Error Handling**: Proper error responses and validation
- **In-memory Storage**: Simple data persistence (easily extendable to databases)

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a specific task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update an existing task |
| DELETE | `/api/tasks/:id` | Delete a task |

### API Response Format

#### Success Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Task",
    "description": "Task description",
    "completed": false,
    "createdAt": "2026-02-17T10:30:00.000Z"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "error": "Task not found"
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: Open `http://localhost:3000` in your browser
   - API: `http://localhost:3000/api/tasks`

## 📁 Project Structure

```
task-manager-api/
├── public/
│   ├── index.html      # Frontend HTML
│   ├── styles.css      # Styling
│   └── app.js          # Frontend JavaScript
├── server.js           # Express server & API routes
├── package.json        # Project dependencies
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 💻 Usage Examples

### Using cURL

**Get all tasks:**
```bash
curl http://localhost:3000/api/tasks
```

**Create a new task:**
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description"}'
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### Using JavaScript (fetch)

```javascript
// Get all tasks
const response = await fetch('http://localhost:3000/api/tasks');
const data = await response.json();

// Create a task
await fetch('http://localhost:3000/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My Task',
    description: 'Task description'
  })
});
```

## 🎯 Technical Highlights

- **Node.js & Express**: Modern backend framework
- **CORS Enabled**: Cross-Origin Resource Sharing for API accessibility
- **Input Validation**: Server-side validation for data integrity
- **RESTful Design**: Proper use of HTTP methods and status codes
- **Responsive Design**: Mobile-friendly interface
- **Clean Code**: Well-organized and commented code

## 🔧 Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Development**: Nodemon for auto-reload

## 🚀 Future Enhancements

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Task categories and tags
- [ ] Due dates and reminders
- [ ] Search and filter functionality
- [ ] Unit and integration tests
- [ ] Deployment configuration

## 📝 License

This project is licensed under the MIT License - feel free to use it for your portfolio!

## 👤 Author

Created as a portfolio project to demonstrate REST API development skills.

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

---

**⭐ If you find this project helpful for learning, please consider giving it a star!**
