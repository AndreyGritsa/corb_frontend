"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import PrintIcon from "@mui/icons-material/Print";
import { useState, useEffect } from "react";

const actions = [{ icon: <PrintIcon />, name: "Print" }];

export default function BasicSpeedDial() {
  const [isAppeared, setIsAppeared] = useState(true);
  useEffect(() => {
    if (!isAppeared) {
      print();
      setTimeout(() => {
        setIsAppeared(true);
      }, 500);
    }
  }, [isAppeared]);
  const handleCLick = () => {
    setIsAppeared(false);
  };
  return (
    <>
      {isAppeared && (
        <Box
          // sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000, // Adjust the z-index as needed
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleCLick}
              />
            ))}
          </SpeedDial>
        </Box>
      )}
    </>
  );
}
