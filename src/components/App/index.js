import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../../containers/Home';
import Cart from '../../containers/Cart';
import Navbar from '../Navbar';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
