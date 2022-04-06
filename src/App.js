
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';
import Banner from './Components/Banner';
import Favourite from './Components/Favourite';
import Movies from './Components/Movies';
import Navbar from './Components/Navbar';


function App() {
  return (

    <Router>
     <Navbar></Navbar>
     <Routes>
       <Route path="/" exact element={<>
       <Banner/>
       <Movies/>
       </>}/>
       <Route path="/favourites" element={<Favourite />}/>
     </Routes>
     </Router>

    // <div className="App">
    //  <>

    //  <Router>
    //   <Navbar/>
    //   <Routes>
    //     <Route path='/' exact render={(props)=>(
    //       <>
    //         <Banner {...props}/>
    //         <Movies {...props}/>
    //       </>
    //     )}/>
    //     <Route path='/favourites' element={<Favourite/>} />
    //   </Routes>
    // </Router>
      
    //  </>
    // </div>
  );
}

export default App;
