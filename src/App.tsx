import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import { Login } from './pages/login';
import { store } from './redux/store';

const Main = lazy(() => import("./pages/main/main"));
const Navbar = lazy(() => import("./components/navbar/navbar"));
const CreatePost = lazy(() => import("./pages/create-post/create-post"));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
         <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-post' element={<CreatePost />} />
          </Routes>
         </Suspense>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
