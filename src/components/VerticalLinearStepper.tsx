"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grafics from "./Grafics.jsx";
import BasicSpeedDial from "./BasicSpeedDial";

const steps = [
  {
    label: "Básicas",
    content: [
      { title: "Peso", measure: "kg" },
      { title: "Talla", measure: "cm" },
    ],
  },
  {
    label: "Pliegues",
    content: [
      { title: "Pliegue Cresta ilíaca", measure: "mm" },
      { title: "Pliegue Supraespinal", measure: "mm" },
      { title: "Pliegue Abdominal", measure: "mm" },
    ],
  },
  {
    label: "Perímetros",
    content: [
      { title: "Perímetro corregido muslo", measure: "cm" },
      { title: "Perímetro corregido antebrazo", measure: "cm" },
      { title: "Perímetro corregido pierna", measure: "cm" },
    ],
  },
];

export default function VerticalLinearStepper() {
  const matches = useMediaQuery("(max-width:600px)");
  const [activeStep, setActiveStep] = useState(0);
  const [isStepPassed, setIsStepPassed] = useState(false);
  const [measures, setMeasures] = useState<{
    [key: string]: {
      values: { [key: number]: any };
      average: number;
    };
  }>(() => {
    const titlesObject: {
      [key: string]: {
        values: { [key: number]: any };
        average: number;
      };
    } = {};

    steps.forEach((step) => {
      step.content.forEach((contentItem) => {
        // Add each title as a key to the object with array of initial values as it's value
        titlesObject[contentItem.title] = {
          values: { 0: "", 1: "", 2: "" },
          average: 0,
        };
      });
    });
    return titlesObject;
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const isStepPassedCalc = () => {
    if (
      activeStep === 0 &&
      measures.Peso.average > 0 &&
      measures.Talla.average > 0
    ) {
      return true;
    } else if (
      activeStep === 1 &&
      measures["Pliegue Cresta ilíaca"].average > 0 &&
      measures["Pliegue Supraespinal"].average > 0 &&
      measures["Pliegue Abdominal"].average > 0
    ) {
      return true;
    } else if (
      activeStep === 2 &&
      measures["Perímetro corregido muslo"].average > 0 &&
      measures["Perímetro corregido antebrazo"].average > 0 &&
      measures["Perímetro corregido pierna"].average > 0
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isStepPassedCalc()) {
      setIsStepPassed(true);
    } else {
      setIsStepPassed(false);
    }
  }, [activeStep, measures]);

  const handleAvarage = (data: object): number => {
    const values = Object.values(data)
      .map((value) => parseFloat(value))
      .filter((value) => !isNaN(value)); // Filter out NaN values
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const average = values.length > 0 ? sum / values.length : 0; // Handle division by zero
    return parseFloat(average.toFixed(2));
  };

  return (
    <Box>
      {activeStep !== steps.length ? (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Último paso</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                {step.content.map((item, index_) => {
                  return (
                    <Grid
                      key={index_}
                      container
                      sx={{
                        mt: 2,
                        p: 2,
                      }}
                      component={Paper}
                      elevation={4}
                    >
                      <Grid xs={12}>
                        <Typography gutterBottom>{item.title}</Typography>
                      </Grid>
                      {Array.from({ length: 3 }).map((_, i) => {
                        return (
                          <Grid key={i} xs={12} sm={4}>
                            <TextField
                              size="small"
                              label={item.measure}
                              variant="filled"
                              type="number"
                              fullWidth={matches}
                              onChange={(e) => {
                                setMeasures((prevData) => {
                                  return {
                                    ...prevData,
                                    [item.title]: {
                                      values: {
                                        ...prevData[item.title].values,
                                        [i]: e.target.value,
                                      },
                                      average: handleAvarage({
                                        ...prevData[item.title].values,
                                        [i]: e.target.value,
                                      }),
                                    },
                                  };
                                });
                              }}
                              value={measures[item.title]["values"][i]}
                              sx={{ ml: 1, mb: 1 }}
                            />
                          </Grid>
                        );
                      })}
                      <Grid
                        sx={{
                          display: "flex",

                          justifyContent: "center",
                        }}
                        xs={12}
                      >
                        <Grid
                          sx={{ width: "100%", ml: 1 }}
                          xs={12}
                          textAlign="center"
                        >
                          <Typography color="text.secondary">
                            Promedio: {measures[item.title]["average"]}
                            {item.measure}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}

                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                      disabled={!isStepPassed}
                    >
                      {index === steps.length - 1 ? "Finalizar" : "Continuar"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Volver
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      ) : (
        measures && <Grafics data={measures} setActiveStep={setActiveStep} />
      )}
      {activeStep === 3 && <BasicSpeedDial />}
    </Box>
  );
}
