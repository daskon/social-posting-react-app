import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { Login } from './pages/login';
import { store } from './redux/store';
import { Main } from './pages/main/main';
import Navbar from './components/navbar/navbar';
import CreatePost from './pages/create-post/create-post';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
         <Router>
          <Navbar />
         <Routes>
           <Route path='/' element={<Main />} />
           <Route path='/login' element={<Login />} />
           <Route path='/create-post' element={<CreatePost />} />
         </Routes>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
