import { BrowserRouter as Router, Route, Link }  from 'react-router-dom'

import OtherPage  from './OtherPage'
import Fibonacci  from './Fibonacci'

import './App.css';



function App () 
{

  return (
    <Router>

      <div className="App">

        <h1>Fibonacci Calculator<h1/>

        <div>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </div>

        <Route exact  path="/"          component={ Fibonacci } />
        <Route        path="/otherpage" component={ OtherPage } />

      </div>

    </Router>
  )

}



export default App
