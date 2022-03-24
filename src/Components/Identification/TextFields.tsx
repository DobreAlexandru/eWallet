import { Divider, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';

const TextFields = ({ fields }: { fields: { [key: string]: string } }) => {
  return (
    <Grid
      container
      rowSpacing={1}
      sx={{
        paddingRight: '20px',
        paddingLeft: '20px',
        textAlign: 'center',
      }}
    >
      {Object.keys(fields).map((item) => {
        return (
          <Fragment key={item}>
            <Grid item xs={6}>
              <Typography variant="body1" component="div">
                {item}
              </Typography>
              <Divider />
            </Grid>
            <Divider orientation="vertical" flexItem></Divider>
            <Grid item xs={5.9}>
              <Typography variant="body1" component="div">
                {fields[item] ? fields[item] : '---------'}
              </Typography>
              <Divider />
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
};

export default TextFields;
