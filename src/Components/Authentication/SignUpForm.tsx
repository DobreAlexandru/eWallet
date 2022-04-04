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

const initialState = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  country: '',
  gender: '',
  nationalID: '',
  birthPlace: '',
  birthDate: null as Date | null,
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [countryCodes, setCountryCodes] = useState([]);
  const { signUp } = useAuth() as AuthType;
  const navigate = useNavigate();

  useEffect(() => {
    const getCountryData = async () => {
      const response = await fetch(
        'https://restcountries.com/v3.1/region/europe',
      );
      const data = await response.json();
      setCountryCodes(data);
    };
    getCountryData();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (
      !formData.birthDate ||
      !formData.email ||
      !formData.password ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.country ||
      !formData.nationalID ||
      !formData.birthPlace ||
      !formData.gender
    ) {
      setError('Please fill out all fields');
      return;
    }
    try {
      await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.country,
        formData.nationalID,
        formData.birthPlace,
        formData.birthDate,
        formData.gender,
      );
      navigate('/menu');
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
                setFormData({ ...formData, firstName: e.target.value })
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
                setFormData({ ...formData, lastName: e.target.value })
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
                setFormData({ ...formData, nationalID: e.target.value })
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
                setFormData({ ...formData, email: e.target.value })
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
                setFormData({ ...formData, password: e.target.value })
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
                value={formData.country}
                onChange={(e: SelectChangeEvent) => {
                  setFormData({ ...formData, country: e.target.value });
                }}
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
                setFormData({ ...formData, birthPlace: e.target.value })
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
                value={formData.gender}
                onChange={(e: SelectChangeEvent) => {
                  setFormData({ ...formData, gender: e.target.value });
                }}
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
                value={formData.birthDate}
                onChange={(newDate) => {
                  setFormData({ ...formData, birthDate: newDate });
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
