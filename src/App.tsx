import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home.tsx';

function App() {

    return (
        <>
            <Router>
                <div>App Works</div>
                {/*<Header />*/}
                <Routes>
                    <Route path='/' element={<Home />}/>
                    {/*<Route path='/error' element={<WrongPage />}/>*/}
                    {/*<Route path='*' element={<WrongPage />}/>*/}
                </Routes>
                {/*<Footer />*/}
            </Router>
        </>
    );
}

export default App;
