(function generateHeavyData() {
  console.log("Cargando módulo de renderizado pesado de analítica...");
  const data = [];
  for (let i = 0; i < 150000; i++) {
    data.push({
      id: i,
      metric: Math.sin(i) * Math.cos(i),
      timestamp: Date.now() + i
    });
  }
  const target = document.getElementById('chart-render-target');
  if (target) {
    target.innerText = `Gráfico procesado activamente: ${data.length} puntos calculados.`;
  }
})();