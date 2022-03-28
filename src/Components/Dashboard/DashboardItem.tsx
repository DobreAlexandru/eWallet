import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Reorder, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

import { DashboardItemType } from '../../Types/DashboardItem';

const DashboardItem = ({ item }: { item: DashboardItemType }) => {
  const y = useMotionValue(0);

  return (
    <Grid item xs={6}>
      <Reorder.Item drag value={item} id={item.name} style={{ y }}>
        <motion.div whileHover={{ y: -10 }}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'grab',
              }}
            >
              <Link
                to={{
                  pathname: item.link,
                }}
                style={{
                  textDecoration: 'none',
                  color: '#F1DAC4',
                  textAlign: 'center',
                }}
              >
                {item.icon}
              </Link>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                style={{
                  textDecoration: 'none',
                  color: '#F1DAC4',
                  textAlign: 'center',
                }}
                gutterBottom
                variant="h6"
              >
                {item.name}
              </Typography>
            </Grid>
          </Grid>
        </motion.div>
      </Reorder.Item>
    </Grid>
  );
};

export default DashboardItem;
