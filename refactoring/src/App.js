import logo from './logo.svg';
import './App.css';
import statement from './chp1/first_code_re_re';
import plays from './data/plays.json';
import invoice from './data/invoice.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Learn React
      </header>
      <div>

      </div>
    </div>
  );
}

console.log(statement(invoice, plays));
// console.log(htmlStatement(invoice, plays));

export default App;
