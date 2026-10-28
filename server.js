const express = require('express');
const useragent = require('express-useragent');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(useragent.express());

const products = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: `Servidor Blade Pro X${i + 1}`,
  category: i % 2 === 0 ? 'Procesadores' : 'Almacenamiento Enterprise',
  price: `$${(1200 + i * 350).toLocaleString()}`,
  specs: {
    cores: `${16 + i * 4} Cores / ${32 + i * 8} Threads`,
    ram: `${64 + i * 32} GB ECC DDR5`,
    throughput: `${100 + i * 10} Gbps PCIe 5.0`,
    power: `${350 + i * 20}W Redundant PSU`
  },
  imgHigh: `https://picsum.photos/id/${10 + i}/800/600`,
  imgLow: `https://picsum.photos/id/${10 + i}/300/200`
}));

app.get('/responsive', (req, res) => {
  res.render('responsive', { products });
});

app.get('/adaptive', (req, res) => {
  const isMobile = req.useragent.isMobile;

  if (isMobile) {
    res.render('mobile', { products });
  } else {
    res.render('desktop', { products });
  }
});

app.get('/', (req, res) => {
  res.send(`
    <h1>Práctica RWD vs AWD</h1>
    <ul>
      <li><a href="/responsive">Versión RWD (Responsive)</a></li>
      <li><a href="/adaptive">Versión AWD (Adaptativa)</a></li>
    </ul>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});