import { TipBox } from './TipBox';
import { ItemBody } from './ItemBody';
import { TableHeader } from './TableHeader';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="Blue-gradient-circle"></div>
      <div className="Green-gradient-circle"></div>
      <div className="App-header row">
      <img className="img-fluid col-lg-3" id="App-logo" src={require('./sopLogo.svg').default} alt='mySvgImage'></img>
      <div className="col-lg-5 col-0"></div>
        <TipBox />
      </div>

      <main>
        
        <div id="Table-container" className="mt-5">
            <TableHeader />
            <ItemBody />
        </div>

      </main>
    </div>
  );
}

export default App;
