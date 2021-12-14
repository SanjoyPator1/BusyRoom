import './App.css';
import Navbar from './components/navbar/Navbar';
import Table from "./components/tables/Table";
import DetailedPage from './components/tables/detailedPage'



import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div>
    <Router>
    <Navbar/>
      <Routes>
      {/* <Route path="/" element={<Table />} /> 
      <Route path="/detailedpage" element={<DetailedPage />} /> */}
      </Routes>
    </Router>
    </div>

  );
}

export default App;
