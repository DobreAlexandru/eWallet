import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.scss';
import Nav from './Components/Navbar/Nav';
import CheckTicket from './Routes/CheckTicket';
import Checkout from './Routes/Checkout';
import Menu from './Routes/Menu';
import Documents from './Routes/Documents';
import Finance from './Routes/Finance';
import Home from './Routes/Home';
import Identification from './Routes/Identification';
import Settings from './Routes/Settings';
import SignIn from './Routes/SignIn';
import SignUp from './Routes/SignUp';
import Transportation from './Routes/Transportation';
import User from './Routes/User';
import ProtectedRoute from './Utils/ProtectedRoute';
import AuthContextProvider from './Contexts/AuthContext';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#A69CAC',
        light: '#A69CAC',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        paper: '#474973', // light-ish blue
        default: '#161b33', // dark blue
      },
      text: {
        primary: '#F1DAC4', // kind of beige
        secondary: '#DBC6B2',
        disabled: '#DBC6B2',
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <Nav />
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/user/:user" element={<User />} />
            <Route path="/tickets/:ticket" element={<CheckTicket />} />
            <Route
              path="/menu"
              element={
                <ProtectedRoute>
                  <Menu />
                </ProtectedRoute>
              }
            />
            <Route
              path="/identification"
              element={
                <ProtectedRoute>
                  <Identification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documents"
              element={
                <ProtectedRoute>
                  <Documents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/finance"
              element={
                <ProtectedRoute>
                  <Finance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transportation"
              element={
                <ProtectedRoute>
                  <Transportation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout/:item"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
