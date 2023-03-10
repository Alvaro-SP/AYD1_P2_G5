import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inicio } from './components/Inicio';
import {AddMovie} from './components/AddMovie';
import { Watchlist } from './components/Watchlist';

function App() {
  return (
    <div className="App">
    {/* <Inicio /> */}
    {/* <AddMovie /> */}
      <Watchlist /> 
    </div>
  );
}

export default App;
