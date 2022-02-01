import './App.css';
import {Button, Allert, Card, Breadcrumb} from 'react-bootstrap'  
import AddDataSet from './components/modal-add-data-set'
import 'bootstrap/dist/css/bootstrap.min.css'
import DataSetCard from './components/dataset-card';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataSetCard/>
      </header>
    </div>
  );
}

export default App;
