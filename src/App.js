import './App.css';
import './Components/Home/home.css';

import { Routes, Route } from 'react-router-dom';
import { Home } from './Components/Home/Home';
import { Authentication } from './Components/Authentication/Authentication';
import { TermsYConds } from './Components/TermsYConds/TermsYConds';
import Consultar from './Components/Consultar/Consultar';
import RegisteredUserContent from './Components/RegisteredUserContent';
import { Dashboard } from './Components/Dashboard/Dashboard';




function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home/>}></Route>
      <Route path='/terminos-y-condiciones' element={<TermsYConds/>}></Route>
      <Route path='/consultar' element={<Consultar />}></Route>
      <Route path='/sign-in' element={<Authentication/>}></Route>
      <Route element={<RegisteredUserContent />}>
              <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
