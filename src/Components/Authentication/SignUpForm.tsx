import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link as MLink,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthType, useAuth } from '../../Contexts/AuthContext';

type CountryNameType = {
  common: string;
};

type CountryType = {
  altSpellings: Array<string>;
  name: CountryNameType;
};

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [nationalID, setNationalID] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const { signUp } = useAuth() as AuthType;
  const navigate = useNavigate();

  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };

  useEffect(() => {
    const getCountryData = async () => {
      const response = await fetch(
        'https://restcountries.com/v3.1/region/europe',
      );
      const data = await response.json();
      setCountryCodes(data);
    };
    getCountryData();
    console.log(countryCodes);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (
      !birthDate ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !country ||
      !nationalID ||
      !birthPlace ||
      !gender
    ) {
      setError('Please fill out all fields');
      return;
    }
    try {
      await signUp(
        email,
        password,
        firstName,
        lastName,
        country,
        nationalID,
        birthPlace,
        birthDate,
        gender,
      );
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <Box
      sx={{
        marginTop: { xs: 0, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar
        sx={{
          m: 1,
          bgcolor: 'primary.main',
        }}
      >
        <LockOutlinedIcon />
      </Avatar>
      <Typography variant="h5" sx={{ display: { xs: 'none', sm: 'block' } }}>
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="nid"
              label="National ID"
              name="nid"
              autoComplete="national-id"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNationalID(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Nationality</InputLabel>
              <Select
                required
                label="Nationality"
                fullWidth
                value={country}
                onChange={handleCountryChange}
              >
                {countryCodes.map((item: CountryType) => {
                  return (
                    <MenuItem
                      value={item.altSpellings[0]}
                      key={item.altSpellings[0]}
                    >
                      {item.name.common}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="birthPlace"
              label="Place of Birth"
              name="birthPlace"
              autoComplete="birth-place"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBirthPlace(e.target.value)
              }
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                required
                label="Gender"
                fullWidth
                value={gender}
                onChange={handleGenderChange}
              >
                <MenuItem value="Male" key="M">
                  Male
                </MenuItem>
                <MenuItem value="Female" key="F">
                  Female
                </MenuItem>
                <MenuItem value="Other" key="O">
                  Other
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Birth Date"
                value={birthDate}
                onChange={(newDate) => {
                  setBirthDate(newDate);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Divider sx={{ mb: 2 }} />
          <Grid item>
            <MLink
              variant="body2"
              component={Link}
              to="/signin"
              style={{ textDecoration: 'none' }}
            >
              Already have an account? Sign in
            </MLink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SignUpForm;
