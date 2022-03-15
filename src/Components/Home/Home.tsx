import React from "react";
import { Container, Typography, Grid } from "@mui/material";
import TextTransition, { presets } from "react-text-transition";
import TechStack from "./TechStack";

const texts = ["ID card", "passport", "documents", "bus tickets"];

const Home = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // Text changes every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <Container
      sx={{
        height: "calc(100% - 66px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        padding: "0",
      }}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            paddingLeft: "5%",
            paddingBottom: "10%",
          }}
        >
          <Typography variant="h3">
            Your
            <TextTransition
              text={texts[index % texts.length]}
              springConfig={presets.wobbly}
              direction="down"
              noOverflow={true}
            />
            on all of your devices
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            width: "100%",
            aspectRatio: "2/1",
            transform: "scale(1.3,1.3)",
          }}
        >
          <TechStack />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
