import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.tsx';
import Header from './components/header/header.tsx';
import Footer from './components/footer/footer.tsx';

function App() {

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path='/error' element={<WrongPage />}/>*/}
          {/*<Route path='*' element={<WrongPage />}/>*/}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
