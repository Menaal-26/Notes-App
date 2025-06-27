import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesPage from './NotesPage';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import TodoList from './Todolist';

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h2>🗒️ Beige Notes</h2>
        <ul>
          <li><Link to="/">🏠 Home</Link></li>
          <li><Link to="/notes">📝 Notes</Link></li>
          <li><Link to="/login">🔐 Login</Link></li>
          <li><Link to="/signup">🆕 Sign Up</Link></li>
          <li><Link to="/todolist">📝To-Do</Link></li>

        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/todolist" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
