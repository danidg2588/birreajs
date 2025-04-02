import './App.scss';
import './Components/Home/home.css';

import { Routes, Route } from 'react-router-dom';
import { TermsYConds } from './Components/TermsYConds/TermsYConds';
import Consultar from './Components/Consultar/Consultar';
import { Dashboard } from './Components/Dashboard/Dashboard';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Home from './Components/Home/Home';


function App() {  
  
  return (
    <Routes>
      <Route path='/terminos-y-condiciones' element={<TermsYConds/>}></Route>
      <Route path='/consultar' element={<Consultar />}></Route>
      <Route path='/' element={<Home />}></Route>
      <Route element={<ProtectedRoutes  />}>
              <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
