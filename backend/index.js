import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import dbConnect from "./configs/dbConfig.js";
import AuthRoutes from "./routes/auth.routes.js";
import ReceipeRoute from "./routes/recipes.routes.js";

const app = express();

const PORT = process.env.PORT || 6001;

// CORS [allow the pass the cookies to orin localhost]
app.use(cors({credentials : true,origin : 'http://localhost:5173'}));

// accept JSONS
app.use(express.json());
app.use(cookieParser());
// config the urlEncoded middleware
app.use(express.urlencoded({extended : false}));

// const URL = process.env.ORIGIN_URL;

// app.use(cors({ credentials: true, origin: URL }));

app.use((req, res, next) => {
  console.log(`${req.method} =====> URL: ${req.url}`);
  next();
});

// root end point
app.get("/",(req,res)=>{
  res.send("Welcome to Recipe-App!"); 
});

app.use("/api/auth", AuthRoutes);
app.use("/receipe", ReceipeRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Intrernal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});



app.listen(PORT, () => {
  console.log(`🚀💀 Server is started on port ${PORT}!`);
  dbConnect();
});
