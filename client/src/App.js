import './App.css';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Edit from './pages/Edit/Edit';
import Profile from './pages/Profile/Profile';
import Header from './components/Headers/Header';
import {Routes,Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer/Footer';
import PageNotFound from './pages/PageNotFound/PageNotFound';
function App() {
  
  return (
    <div  className='containerStyle'>
    <Header style={{ color: 'red' }} />
    <main  className='mainStyle'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </main>
    <ToastContainer />
    <Footer />
  </div>
  );
}

export default App;
