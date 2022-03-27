import {
  AccountBalanceOutlined,
  BusinessOutlined,
  Delete,
  DirectionsCarOutlined,
  FastfoodOutlined,
  HouseOutlined,
  MoneyOutlined,
  MoreHorizOutlined,
  MovieOutlined,
  SavingsOutlined,
  ShoppingBagOutlined,
  TravelExploreOutlined,
} from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

import { AuthType, useAuth } from '../../Contexts/AuthContext';
import { db } from '../../Firebase/config';
import useDoc from '../../Hooks/useDoc';
import { FinanceDataItem } from '../../Types/FinanceData';
import calculateDate from '../../Utils/Helpers/calculateDate';

const icons: { [key: string]: JSX.Element } = {
  Grocheries: <FastfoodOutlined />,
  Household: <HouseOutlined />,
  Vehicle: <DirectionsCarOutlined />,
  Entertainment: <MovieOutlined />,
  Travel: <TravelExploreOutlined />,
  Shopping: <ShoppingBagOutlined />,
  Other: <MoreHorizOutlined />,
  Savings: <SavingsOutlined />,
  Investment: <AccountBalanceOutlined />,
  Salary: <MoneyOutlined />,
  Business: <BusinessOutlined />,
};

const Transactions = () => {
  const data = useDoc('transactions') as Array<FinanceDataItem>;
  const { user } = useAuth() as AuthType;

  const handleDelete = (e: any, item: FinanceDataItem) => {
    e.preventDefault();
    const docRef = doc(db, 'users', user!.uid);
    updateDoc(docRef, {
      transactions: arrayRemove(item),
    });
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '40%',
        overflowY: 'auto',
        color: 'transparent',
      }}
      className="laptop-box"
    >
      {data &&
        data
          .slice(0) // Had to make a copy to be able to reverse data
          .reverse()
          .map((item: FinanceDataItem) => {
            return (
              <Card
                component={motion.div}
                layout
                sx={{
                  width: '100%',
                  marginBottom: '25px',
                  backgroundColor: '#161b33',
                }}
                elevation={5}
                key={item.id}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        backgroundColor:
                          item.type === 'expense' ? '#FE5F55' : '#ABDF75',
                      }}
                    >
                      {icons[item.category]}
                    </Avatar>
                  }
                  action={
                    <Stack>
                      <Typography variant="body1">
                        {item.type === 'expense'
                          ? '- € ' + item.amount
                          : '€ ' + item.amount}
                      </Typography>
                      <IconButton
                        disableRipple
                        onClick={(e) => handleDelete(e, item)}
                      >
                        <Delete sx={{ color: '#F1DAC4' }} />
                      </IconButton>
                    </Stack>
                  }
                  title={
                    <Typography variant="body1">{item.category}</Typography>
                  }
                  subheader={
                    <Typography variant="caption">
                      {calculateDate(item.date)}
                    </Typography>
                  }
                />
              </Card>
            );
          })}
    </Box>
  );
};

export default Transactions;
