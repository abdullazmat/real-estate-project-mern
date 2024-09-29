import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import About from './Pages/About'
import SignUp from './Pages/SignUp';
import SignOut from './Pages/SignOut';
import SignIn from './Pages/SignIn'
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about-us' element={<About/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-out' element={<SignOut/>} />
        <Route path='/sign-in' element= {<SignIn/>} />
        <Route path='/profile' element={<Profile/>} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
