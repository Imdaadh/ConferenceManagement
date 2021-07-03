
import './App.css';
import {BrowserRouter as Router ,Route, Switch} from "react-router-dom";

import MainPages from '../src/components/router/AppRouter';









function App() {
  return (
      <Router>
          <div className="App">

              <MainPages />
          </div>
      </Router>
  );
}

export default App;
