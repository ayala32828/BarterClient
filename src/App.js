import './App.css';

import { Login } from './components/login/login';
import { GetMyOffers } from './components/myOffers/myOffers';
import { Navigation } from './components/links/navigation/navig';
import { NewOffer } from './components/newOffer/newOffer';
import { Routing } from './components/links/rout/routing';
import { Run } from './components/subComp/running/run';
// import {Pap}


function App() {

  return (
    <div >
      <Run/>
      <Navigation/>
      <Routing/>
      {/* <CollapsibleTable/> */}
    </div>
  );
}

export default App;
