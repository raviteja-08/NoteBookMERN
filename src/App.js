import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import StateCon from './context/notes/StateCon';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {


  


  return (
    <StateCon>

    <div className="App">
      
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Notes' element={ <Notes/> }/>
        <Route path='/signup' element={<SignUp/>}/>  
        <Route path='/login' element={<Login/>}/>  
        
        
      </Routes>
      
      
    </div>
    </StateCon>
  );
}

export default App;
