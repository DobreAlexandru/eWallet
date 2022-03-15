import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useMotionValue, Reorder } from "framer-motion";

const DashboardItem = ({ item }: { item: any }) => {
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "grab",
              }}
            >
              {item.icon}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                style={{
                  textDecoration: "none",
                  color: "#F1DAC4",
                  textAlign: "center",
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
                    textDecoration: "none",
                    color: "#F1DAC4",
                    textAlign: "center",
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
