import { Switch, Route, NavLink } from 'react-router-dom';
import FindDoctor from './components/FindDoctor';
import Services from './components/Services';
import About from './components/About';
import Emergency from './components/Emergency';
import CarePlans from './components/CarePlans';
import NotFound from './components/NotFound';
import './App.css';

const App = () => {
  return (
    <div>
      <nav>
        <NavLink
          to="/"
          title="Doc.ly"
          className="logo"
          activeClassName="selected"
        >
          Doc.ly
        </NavLink>
        <ul>
          <li>
            <NavLink
              to="/find-a-doctor"
              title="Find a doctor"
              activeClassName="selected"
            >
              Find a Doctor
            </NavLink>
          </li>
          <li>
            <NavLink to="/services" title="Services" activeClassName="selected">
              Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/care-plans"
              title="Care Plans"
              activeClassName="selected"
            >
              Care Plans
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" title="About" activeClassName="selected">
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/emergency"
              title="Emergency"
              activeClassName="selected"
            >
              Emergency
            </NavLink>
          </li>
        </ul>
      </nav>
      <main>
        <Switch>
          <Route exact path="/" component={FindDoctor} />
          <Route exact path="/find-a-doctor" component={FindDoctor} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/about" component={About} />
          <Route exact path="/emergency" component={Emergency} />
          <Route exact path="/care-plans" component={CarePlans} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
