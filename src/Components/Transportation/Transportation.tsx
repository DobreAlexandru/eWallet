import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DashboardItem from "../Dashboard/DashboardItem/DashboardItem";
import TrainIcon from "@mui/icons-material/Train";
import TrainOutlinedIcon from "@mui/icons-material/TrainOutlined";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import DirectionsBusFilledOutlinedIcon from "@mui/icons-material/DirectionsBusFilledOutlined";
import { Reorder } from "framer-motion";
import { Grid, Container } from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/AuthContext";
import { db } from "../../Firebase/config";
import QRCode from "react-qr-code";
import { useEffect } from "react";
import SwipeUpIcon from "@mui/icons-material/SwipeUp";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { arrayRemove } from "firebase/firestore";
import { Paper } from "@mui/material";

const drawerBleeding = 56;

const categories = [
  {
    name: "Single Metro Trip",
    icon: (
      <TrainIcon
        sx={{
          fontSize: 125,
          color: "#F1DAC4",
        }}
      />
    ),
    link: "/checkout",
    color: "#A69CAC",
    hash: "singlemetro",
  },
  {
    name: "Monthly Metro Pass",
    icon: <TrainOutlinedIcon sx={{ fontSize: 125, color: "#F1DAC4" }} />,
    link: "/checkout",
    color: "#A69CAC",
    hash: "monthlymetro",
  },
  {
    name: "Single Bus Trip",
    icon: <DirectionsBusIcon sx={{ fontSize: 125, color: "#F1DAC4" }} />,
    link: "/checkout",
    color: "#A69CAC",
    hash: "singlebus",
  },
  {
    name: "Monthly Bus Pass",
    icon: (
      <DirectionsBusFilledOutlinedIcon
        sx={{ fontSize: 125, color: "#F1DAC4" }}
      />
    ),
    link: "/checkout",
    color: "#A69CAC",
    hash: "monthlybus",
  },
];

const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function Transportation() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = useState(categories);
  const { user } = useAuth() as any;
  const [links, setLinks] = useState([]);

  const getDB = async () => {
    const docRef = doc(db, "users", user.uid);
    await getDoc(docRef).then((doc: any) =>
      setLinks(doc.data().transportationIDS)
    );
  };

  // Delete ticket from database and refresh drawer
  const handleDelete = (item: any) => {
    const docRef = doc(db, "users", user.uid);
    updateDoc(docRef, {
      transportationIDS: arrayRemove(item),
    });
    getDB();
  };

  // Calculate ticket expiration date
  const calculateDate = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return (
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
    );
  };

  // Delay is here so animation doesn't bug out
  useEffect(() => {
    if (user.uid !== undefined) {
      setTimeout(() => {
        getDB();
      }, 1500);
    }
  }, [user]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Root style={{ height: "100%", width: "100%" }}>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(75% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          zIndex: "2",
          bottom: "56px",
          width: "30px",
          color: "#F1DAC4",
        }}
        size="large"
        disableRipple={true}
      >
        <SwipeUpIcon />
      </IconButton>

      <motion.div
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
        style={{ height: "100%", width: "100%" }}
      >
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
          <Reorder.Group onReorder={setItems} values={items}>
            <Grid container>
              {items.map((item) => {
                return <DashboardItem key={item.name} item={item} />;
              })}
            </Grid>
          </Reorder.Group>
        </Container>
      </motion.div>

      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        disableDiscovery={true}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ p: 2, color: "text.primary", textAlign: "center" }}
          >
            Your Tickets
          </Typography>
        </StyledBox>
        <StyledBox
          className="transportation-box"
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            {links.map((item: any) => (
              <Grid
                item
                xs={12}
                md={7}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "25px",
                  paddingTop: "25px",
                }}
                key={item.code}
              >
                <Paper
                  elevation={3}
                  sx={{
                    backgroundColor: "#161b33",
                    maxWidth: "600px",
                    minWidth: "70%",
                  }}
                >
                  <Grid container>
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        paddingTop: "25px",
                      }}
                      variant="h5"
                      gutterBottom
                      component="div"
                    >
                      {item.name}
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <QRCode value={item.code} />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        sx={{
                          width: "100%",
                          textAlign: "center",
                        }}
                        variant="h5"
                      >
                        Expiry date: {calculateDate(item.expiryDate)}
                      </Typography>

                      <IconButton
                        aria-label="delete"
                        sx={{ color: "#F1DAC4" }}
                        onClick={() => handleDelete(item)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
