import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Import routes
import authRoute from "./routes/UserRoute.js";
import docRoute from "./routes/DocRoutes.js";
import pharmaRoute from "./routes/PharmacyRoutes.js";
import cartRoute from "./routes/cartRoute.js";
import appointmentRoute from "./routes/AppointmentRoute.js";
import hospitalRoute from "./routes/HospitalRoute.js";

// Use routes
app.use("/api/auth", authRoute);
app.use("/api/doctors", docRoute);
app.use("/api/pharmacy", pharmaRoute);
app.use("/api/cart", cartRoute);
app.use("/api/appointment", appointmentRoute);
app.use("/api/hospital", hospitalRoute);

// Export the handler for Vercel
export default app;
