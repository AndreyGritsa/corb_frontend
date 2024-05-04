import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import VerticalLinearStepper from "@/components/VerticalLinearStepper";

export default function Home() {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: 2,
      }}
    >
      <Box component={Paper} sx={{ p: 2 }}>
        <VerticalLinearStepper />
      </Box>
    </Grid>
  );
}
