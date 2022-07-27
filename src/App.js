import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import Home from './components/home/Home';
import Details from './components/details/Details';

const App = () => (
  <Router>
    <LoadingBar className="App-loading-bar" />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:name" element={<Details />} />
    </Routes>
  </Router>
);

export default App;
