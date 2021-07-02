// import './App.css';
import { MyForm } from "./Myform"
import Found from "./Found"
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import NotFound from "./NotFound";
import TheWall from "./TheWall";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MyForm}></Route>
          <Route exact path='/missing' component={TheWall}></Route>
          <Route exact path='/found' component={Found} ></Route>
          <Route exact path='/notfound' component={NotFound} ></Route>
          <Route render={() => <h1>404: page not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
