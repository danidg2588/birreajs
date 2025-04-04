import './App.scss';
import './Components/Home/home.scss';

import { Routes, Route } from 'react-router-dom';
import { TermsYConds } from './Components/TermsYConds/TermsYConds';
import Consultar from './Components/Consultar/Consultar';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Home from './Components/Home/Home';
import ControlPanel from './Components/ControlPanel/ControlPanel';


function App() {  
  
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path='/terminos-y-condiciones' element={<TermsYConds/>}></Route>
      <Route path='/consultar' element={<Consultar />}></Route>
      <Route element={<ProtectedRoutes  />}>
              <Route path="/board" element={<ControlPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
