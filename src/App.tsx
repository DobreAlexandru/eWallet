import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.scss';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import Checkout from './Components/Checkout/Checkout';
import AuthContextProvider from './Components/Contexts/AuthContext';
import Dashboard from './Components/Dashboard/Dashboard';
import Documents from './Components/Documents/Documents';
import Health from './Components/Health/Health';
import Home from './Components/Home/Home';
import Identification from './Components/Identification/Identification';
import Nav from './Components/Navbar/Nav';
import ProtectedRoute from './Components/ProtectedRoute';
import Settings from './Components/Settings/Settings';
import Transportation from './Components/Transportation/Transportation';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
              path="/health"
              element={
                <ProtectedRoute>
                  <Health />
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
              path="/checkout"
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
