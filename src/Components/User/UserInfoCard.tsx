import { Divider, Paper, Typography } from '@mui/material';

const UserInfoCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <Paper sx={{ padding: '20px', minWidth: '200px' }}>
      <Typography variant="body1" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Typography variant="body2" gutterBottom>
        {content}
      </Typography>
    </Paper>
  );
};

export default UserInfoCard;
