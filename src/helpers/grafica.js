import axios from "axios";

const showChart = async (datos) => {
  //   const { data: datos } = await axios.get("https://mindicador.cl/api");
  //   const { dolar, euro, uf } = datos;

  //   const indicadores = [dolar, euro, uf];
  //   const labels = indicadores.map((i) => i.codigo);
  //   const data = indicadores.map((i) => i.valor);
  const labels = datos.map((i) => i.name);
  const data = datos.map((i) => Number(i.price));
  var config = {
    type: "pie",
    data: {
      datasets: [
        {
          data,
          backgroundColor: ["red", "orange", "yellow"],
        },
      ],
      labels,
    },
    options: {
      responsive: true,
    },
  };

  var ctx = document.getElementById("migrafica").getContext("2d");

  window.myPie = new Chart(ctx, config);
};

export default { showChart };
