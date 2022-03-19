import { Grid, Typography } from '@mui/material';
import { SvgIconProps } from '@mui/material';
import { motion } from 'framer-motion';
import { Reorder, useMotionValue } from 'framer-motion';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export type ItemType = {
  name: string;
  icon: ReactElement<SvgIconProps>;
  link: string;
  color: string;
  hash: string;
};

const DashboardItem = ({ item }: { item: ItemType }) => {
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
              {item.icon}
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
                <Link
                  to={{
                    pathname: item.link,
                    hash: item.hash,
                  }}
                  style={{
                    textDecoration: 'none',
                    color: '#F1DAC4',
                    textAlign: 'center',
                  }}
                >
                  {item.name}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </motion.div>
      </Reorder.Item>
    </Grid>
  );
};

export default DashboardItem;