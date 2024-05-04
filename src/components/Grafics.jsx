import Grid from "@mui/material/Unstable_Grid2";
import BasicLineChart from "./BasicLineChart";
import { useEffect, useState } from "react";
import BasicBarsChart from "./BasicBarsChart";
import BasicBarsChartMus from "./BasicBarsChartMus";
import UndoIcon from "@mui/icons-material/Undo";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DataTable from "./DataTable";

function calcMasMus(talla, pcm, pca, pcp) {
  return parseFloat(
    (
      (talla *
        (0.0553 * Math.pow(pcm, 2) +
          0.0987 * Math.pow(pca, 2) +
          0.0331 * Math.pow(pcp, 2)) -
        2554) /
      1000
    ).toFixed(2)
  );
}

function stateDataUpdate(prevData, where, addData) {
  const index = prevData.findIndex((value) => value[where] === "Ahora");
  if (index === -1) {
    return [...prevData, addData];
  } else {
    const updatedData = [...prevData];
    updatedData[index] = addData;
    return updatedData;
  }
}

export default function Grafics({ data, setActiveStep }) {
  const [muscleMas, setMuscleMas] = useState(0);
  const [plAvarage, setPlAvarage] = useState(0);
  const [pastDataPeso, setPastDataPeso] = useState([
    { title: "Medicion 1", value: 68.2 },
    { title: "Medicion 2", value: 69.8 },
    { title: "Medicion 3", value: 70 },
  ]);
  const [pastDataPlieguesSum, setPastDataPlieguesSum] = useState([
    { title: "Medicion 1", value: 17 },
    { title: "Medicion 2", value: 18.3 },
    { title: "Medicion 3", value: 18.2 },
  ]);
  const [pastDataPliegues, setPastDataPliegues] = useState([
    {
      "Pliegue Cresta ilíaca": 6.8,
      "Pliegue Supraespinal": 3.4,
      "Pliegue Abdominal": 8,
      when: "Medicion 3",
    },
  ]);
  const [pastDataMas, setPastDataMas] = useState([
    { title: "Medicion 1", value: calcMasMus(166, 49.1, 26.1, 32.1) },
    { title: "Medicion 2", value: calcMasMus(166, 50.3, 27.4, 33.5) },
    { title: "Medicion 3", value: calcMasMus(166, 52.4, 27.5, 33.8) },
  ]);
  const [pastDataMasLast, setPastDataMasLast] = useState([
    {
      value: calcMasMus(166, 52.4, 27.5, 33.8),
      when: "Medicion 3",
    },
  ]);

  useEffect(() => {
    setPastDataMas((prevData) => {
      return stateDataUpdate(prevData, "title", {
        title: "Ahora",
        value: muscleMas,
      });
    });
    setPastDataMasLast((prevData) => {
      return stateDataUpdate(prevData, "when", {
        when: "Ahora",
        value: muscleMas,
      });
    });
  }, [muscleMas]);

  useEffect(() => {
    setPastDataPlieguesSum((previousData) => {
      const index = previousData.findIndex((value) => value.title === "Ahora");
      if (index === -1) {
        return [...previousData, { title: "Ahora", value: plAvarage }];
      } else {
        // Update the data at the found index
        const updatedData = [...previousData];
        updatedData[index] = { title: "Ahora", value: plAvarage };
        return updatedData;
      }
    });
  }, [plAvarage]);

  useEffect(() => {
    setMuscleMas(
      calcMasMus(
        data.Talla.average,
        data["Perímetro corregido muslo"].average,
        data["Perímetro corregido antebrazo"].average,
        data["Perímetro corregido pierna"].average
      )
    );
    setPlAvarage(
      data["Pliegue Cresta ilíaca"].average +
        data["Pliegue Supraespinal"].average +
        data["Pliegue Abdominal"].average
    );
    setPastDataPeso((prevData) => {
      return stateDataUpdate(prevData, "title", {
        title: "Ahora",
        value: data.Peso.average,
      });
    });
    setPastDataPliegues((prevData) => {
      return stateDataUpdate(prevData, "when", {
        "Pliegue Cresta ilíaca": data["Pliegue Cresta ilíaca"].average,
        "Pliegue Supraespinal": data["Pliegue Supraespinal"].average,
        "Pliegue Abdominal": data["Pliegue Abdominal"].average,
        when: "Ahora",
      });
    });
  }, [data]);

  return (
    <Grid container>
      <Grid>
        <Tooltip title="Regresar" placement="top">
          <IconButton
            onClick={() => {
              setActiveStep(2);
            }}
          >
            <UndoIcon />
          </IconButton>
        </Tooltip>
      </Grid>

      <Grid container xs={12}>
        <DataTable
          data={[
            { name: "Peso promedio", value: `${data.Peso.average}kg` },
            { name: "Talla", value: `${data.Talla.average}cm` },
          ]}
        />

        <BasicLineChart previousData={pastDataPeso} unit="kg" label="Peso" />
      </Grid>
      <Grid container xs={12}>
        <DataTable
          data={[{ name: "Suma 3 Pliegues", value: `${plAvarage}mm` }]}
        />

        <BasicLineChart
          previousData={pastDataPlieguesSum}
          unit="mm"
          label="Valor del sumatorio de 3 pliegues"
        />
        <BasicBarsChart data={pastDataPliegues} />
      </Grid>
      <Grid container xs={12}>
        <DataTable
          data={[
            { name: "Valor de la masa muscular", value: `${muscleMas}kg` },
          ]}
        />

        <BasicLineChart
          previousData={pastDataMas}
          unit="kg"
          label="Valor de la masa muscular"
        />
        <BasicBarsChartMus data={pastDataMasLast} />
      </Grid>
    </Grid>
  );
}
