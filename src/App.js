import './App.scss';
import './Components/Home/home.scss';

import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Home from './Components/Home/Home';
import ControlPanel from './Components/ControlPanel/ControlPanel';
import Faqs from './Components/Faqs/Faqs';
import { useState } from 'react';


function App() {

  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <Routes>
      <Route index element={<Home isLoading={isLoading} setIsLoading={setIsLoading} />}></Route>
      <Route path='/faqs' element={<Faqs />}></Route>
      <Route element={<ProtectedRoutes isLoading={isLoading} setIsLoading={setIsLoading}  />}>
              <Route path="/board" element={<ControlPanel isLoading={isLoading} setIsLoading={setIsLoading} />} />
      </Route>

    </Routes>
  );
}

export default App;
