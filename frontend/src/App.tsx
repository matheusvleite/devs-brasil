import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { useAuth } from './hooks/useAuth';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import Search from './pages/Search/Search';

const App = () => {
const {auth} = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id' element={auth ? <Profile /> : <Navigate to='/login' />} />
          <Route path='/search' element={auth ? <Search /> : <Navigate to='/login' />} />
          <Route path='/editprofile' element={auth ? <EditProfile /> : <Navigate to='/login' />} />
          <Route path='/login' element={!auth ? <Login /> : <Navigate to='/' />} />
          <Route path='/signup' element={!auth ? <SignUp /> : <Navigate to='/editprofile' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
