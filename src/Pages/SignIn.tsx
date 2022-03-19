import { Container } from '@mui/material';

import SignInForm from '../Components/Authentication/SignInForm';

const SignIn = () => {
  return (
    <Container component="main" maxWidth="xs">
      <SignInForm />
    </Container>
  );
};

export default SignIn;
