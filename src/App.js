import './App.css';
import { Pagination } from './lib';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Pagination
          total={100}
        />
      </header>
    </div>
  );
}

export default App;
