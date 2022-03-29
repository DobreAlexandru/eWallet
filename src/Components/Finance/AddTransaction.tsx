import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Popover from '@mui/material/Popover';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';

const categories = {
  expense: [
    'Grocheries',
    'Utilities',
    'Medical',
    'Personal',
    'Gifts',
    'Education',
    'Household',
    'Vehicle',
    'Entertainment',
    'Travel',
    'Shopping',
    'Other',
  ],
  income: ['Salary', 'Investment', 'Business', 'Savings', 'Other'],
};

const initialState = {
  type: 'expense',
  category: '',
  date: new Date(),
  amount: 0,
  id: uuid(),
};

const AddTransaction = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth() as AuthType;

  const selectedCategory =
    formData.type === 'income' ? categories.income : categories.expense;

  const open = Boolean(anchorEl);

  const handleAdd = () => {
    const docRef = doc(db, 'users', user!.uid);

    if (
      formData.type &&
      formData.category &&
      formData.amount &&
      formData.date
    ) {
      updateDoc(docRef, {
        transactions: arrayUnion(formData),
      });
      setFormData({
        ...formData,
        type: 'expense',
        category: '',
        amount: 0,
        id: uuid(),
      });
      setAnchorEl(null);
    }
  };

  return (
    <Box>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} disableRipple>
        <AddCircleOutlineOutlinedIcon
          sx={{ fontSize: '50px', color: '#F1DAC4' }}
        />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={(e) => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box component="form" sx={{ p: 2 }}>
          <Grid container spacing={2} sx={{ width: '200px', maxWidth: '90vw' }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  required
                  type="text"
                  label="Type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                      category: '',
                    })
                  }
                >
                  <MenuItem value="expense">Expense</MenuItem>
                  <MenuItem value="income">Income</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  required
                  type="text"
                  label="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  {selectedCategory.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="number"
                label="Amount"
                fullWidth
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birth Date"
                  value={formData.date}
                  onChange={(newDate) =>
                    newDate && setFormData({ ...formData, date: newDate })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={handleAdd}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Popover>
    </Box>
  );
};

export default AddTransaction;
