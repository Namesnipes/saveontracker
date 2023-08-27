import { LastUpdated } from './LastUpdated';
import { ItemBody } from './ItemBody';
import { TableHeader } from './TableHeader';
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Savers</h1>
        <LastUpdated />
      </header>
      <main>
        <div>
          <table>
            <TableHeader />
            <ItemBody />
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
