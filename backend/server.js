require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const casoRoutes = require("./routes/casoRoutes");
const testigoRoutes = require("./routes/testigoRoutes");
const victimaRoutes = require("./routes/victimaRoutes");
const verificadorRoutes = require("./routes/verificadorRoutes");
const fuenteRoutes = require("./routes/fuenteRoutes");

// Middlewares
const corsOptions = {
  origin: ["https://gemapp.es", "http://localhost:3000"], 
  methods: "GET,POST,PUT,DELETE",
  credentials: true
};

app.use(cors(corsOptions)); 
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/casos", casoRoutes);
app.use("/api/testigos", testigoRoutes);
app.use("/api/victimas", victimaRoutes);
app.use("/api/verificadores", verificadorRoutes);
app.use("/api/fuentes", fuenteRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor corriendo en https://0.0.0.0:${PORT}`);
});
