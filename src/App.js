import './App.css';
import './Components/Home/home.css';

import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { TermsYConds } from './Components/TermsYConds/TermsYConds';
import Consultar from './Components/Consultar/Consultar';
import { Dashboard } from './Components/Dashboard/Dashboard';
import ProtectedRoutes from './Components/ProtectedRoutes';


function App() {  
  
  return (
    <Routes>
      <Route path='/terminos-y-condiciones' element={<TermsYConds/>}></Route>
      <Route path='/consultar' element={<Consultar />}></Route>

      <Route path='/' element={<ProtectedRoutes  />}>
              <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
