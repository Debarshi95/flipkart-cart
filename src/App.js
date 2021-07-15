import "./App.css";
import Home from "./pages/home";
import Cart from "./pages/cart";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";

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
