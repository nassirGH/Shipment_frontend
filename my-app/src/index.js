import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Register from './Pages/Register';
import ShipmentPage from './Pages/Shipment';
import AddNewShipment from './Pages/AddNewShipment';
import EditShipment from './Pages/EditShipment';
import DeleteShipment from './Pages/DeleteShipment';



const Routing = () => {
  return(
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/register" component={Register} />
        <Route path="/shipmentPage" component={ShipmentPage} />
        <Route path="/newShipment" component={AddNewShipment} />
        <Route path="/editShipment" component={EditShipment} />
        <Route path="/deleteShipment" component={DeleteShipment} />

      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);