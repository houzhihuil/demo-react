import './App.css'; 
import Create from './components/create';
import Read from './components/read';
import Update from './components/update'; 
import { BrowserRouter as Router, Routes,  Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


 function App() { 
  return ( 
      <>  
      <Router>
          <div className="main">
            <h2 className="main-header">React Crud Operations</h2>
            <Routes> 
              <Route index element={<Read />} />
              <Route path='/create' element={<Create />} />
              <Route path='/read' element={<Read />} /> 
              <Route path="/update/:_id" element={<Update />} /> 
            </Routes>

 
          </div>
      </Router>  

      </>
    ) 
}   

export default App;
