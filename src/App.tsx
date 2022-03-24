import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.scss';
import Nav from './Components/Navbar/Nav';
import AuthContextProvider from './Contexts/AuthContext';
import Checkout from './Routes/Checkout';
import Dashboard from './Routes/Dashboard';
import Documents from './Routes/Documents';
import Finance from './Routes/Finance';
import Home from './Routes/Home';
import Identification from './Routes/Identification';
import Settings from './Routes/Settings';
import SignIn from './Routes/SignIn';
import SignUp from './Routes/SignUp';
import Transportation from './Routes/Transportation';
import ProtectedRoute from './Utils/ProtectedRoute';

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
