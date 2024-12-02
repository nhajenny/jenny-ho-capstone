import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header/Header.jsx';
import Homepage from './pages/Homepage/Homepage.jsx';
import TipsPage from './pages/TipsPage/TipsPage.jsx';
import Festivals from './pages/Festivals/Festivals.jsx';
import FestivalDetails from './components/FestivalDetails/FestivalDetails.jsx';


function App() {
 
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/festivals" element={<Festivals/>}/>
        <Route path="/festivals/:id" element={<FestivalDetails />} />
        <Route path="/tips" element={<TipsPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
