import './app-default.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home.tsx';
import Header from '../shared/components/header/header.tsx';
import Footer from '../shared/components/footer/footer.tsx';
import WrongPage from '../shared/components/wrong-page/wrong-page.tsx';
import Login from '../shared/components/login/login.tsx';
import { Provider } from 'react-redux';
import { userStore } from './store/user-store.ts';
import Profile from './pages/profile.tsx';

function App() {
  return (
    <>
      <Router>
        <Provider store={userStore}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/error" element={<WrongPage />} />
            <Route path="*" element={<WrongPage />} />
          </Routes>
          <Footer />
        </Provider>
      </Router>
    </>
  );
}

export default App;
