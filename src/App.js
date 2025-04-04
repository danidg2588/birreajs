import './App.scss';
import './Components/Home/home.scss';

import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Home from './Components/Home/Home';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import Faqs from './Components/Faqs/Faqs';


function App() {  
  
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path='/faqs' element={<Faqs />}></Route>
      <Route element={<ProtectedRoutes  />}>
              <Route path="/board" element={<ControlPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
