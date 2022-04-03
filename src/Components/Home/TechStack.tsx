import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';

import CssIcon from '../../Icons/CssIcon';
import FacebookIcon from '../../Icons/FacebookIcon';
import FirebaseIcon from '../../Icons/FirebaseIcon';
import FramerIcon from '../../Icons/FramerIcon';
import GitHubIcon from '../../Icons/GitHubIcon';
import HerokuIcon from '../../Icons/HerokuIcon';
import HtmlIcon from '../../Icons/HtmlIcon';
import InstagramIcon from '../../Icons/InstagramIcon';
import LinkedInIcon from '../../Icons/LinkedInIcon';
import MaterialIcon from '../../Icons/MaterialIcon';
import NetlifyIcon from '../../Icons/NetlifyIcon';
import NodeIcon from '../../Icons/NodeIcon';
import NpmIcon from '../../Icons/NpmIcon';
import ReactIcon from '../../Icons/ReactIcon';
import RouterIcon from '../../Icons/RouterIcon';
import SassIcon from '../../Icons/SassIcon';
import StripeIcon from '../../Icons/StripeIcon';
import TypescriptIcon from '../../Icons/TypescriptIcon';
import ViteIcon from '../../Icons/ViteIcon';
import VsCodeIcon from '../../Icons/VsCodeIcon';
import PWA from '../../Icons/PWA';
import PhoneInstall from '../../Images/PhoneInstall.webp';

const TechStack = () => {
  return (
    <Grid
      item
      xs={12}
      md={7}
      sx={{
        width: '100%',
        aspectRatio: '2/1',
        transform: 'scale(1.3,1.3)',
      }}
    >
      <motion.div
        className="laptop-container"
        transition={{
          duration: 0.5,
          type: 'tween',
        }}
        whileHover={{
          scale: 1.6,
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            height: '73%',
            width: '60%',
            overflowY: 'scroll',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="laptop-box"
        >
          <Grid container sx={{ height: '100%', width: '100%' }} spacing={3}>
            <Grid item xs={4}>
              <img src={PhoneInstall} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={8}>
              <PWA />
            </Grid>
            <Grid item xs={6}>
              <a href="https://reactjs.org/">
                <ReactIcon />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a href="https://www.typescriptlang.org/">
                <TypescriptIcon />
              </a>
            </Grid>
            <Grid item xs={4}>
              <HtmlIcon />
            </Grid>
            <Grid item xs={4}>
              <CssIcon />
            </Grid>
            <Grid item xs={4}>
              <a href="https://sass-lang.com/">
                <SassIcon />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a href="https://mui.com/">
                <MaterialIcon />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a href="https://www.framer.com/motion/">
                <FramerIcon />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a href="https://firebase.google.com/">
                <FirebaseIcon />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a href="https://stripe.com/">
                <StripeIcon />
              </a>
            </Grid>
            <Grid item xs={4}>
              <a href="https://reactrouter.com/">
                <RouterIcon />
              </a>
            </Grid>

            <Grid item xs={3}>
              <a href="https://vitejs.dev/">
                <ViteIcon />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a href="https://nodejs.org/en/">
                <NodeIcon />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a href="https://www.npmjs.com/">
                <NpmIcon />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a href="https://code.visualstudio.com/">
                <VsCodeIcon />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a href="https://www.netlify.com/">
                <NetlifyIcon />
              </a>
            </Grid>
            <Grid item xs={6}>
              <a href="https://www.heroku.com/home">
                <HerokuIcon />
              </a>
            </Grid>

            <Grid item xs={3}>
              <a href="https://www.linkedin.com/in/dobre-alexandru-dib/">
                <LinkedInIcon />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a href="https://github.com/DobreAlexandru">
                <GitHubIcon />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a href="https://www.facebook.com/IAmDibber/">
                <FacebookIcon />
              </a>
            </Grid>
            <Grid item xs={3}>
              <a href="https://www.instagram.com/iamdibber/">
                <InstagramIcon />
              </a>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Grid>
  );
};

export default TechStack;
