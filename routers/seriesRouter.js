import express from "express";
const seriesRoutes = express.Router();
import seriesController from "../controllers/seriesController.js";
import { authorization } from "../middleware/Auth.js";

// Endpoint para cadastrar uma nova série
seriesRoutes.post("/series", authorization, seriesController.newSerie);

// Endpoint para cadastrar muitas séries
seriesRoutes.post("/series/many", authorization, seriesController.createManySeries);

// Endpoint para buscar todas as séries
seriesRoutes.get("/series", authorization, seriesController.getAllSeries);

// Endpoint para buscar uma série pelo ID
seriesRoutes.get("/series/:id", authorization, seriesController.getOneSerie);

// Endpoint para atualizar uma série pelo ID
seriesRoutes.put("/series/:id", authorization, seriesController.updateSerie);

// Endpoint para deletar uma série pelo ID
seriesRoutes.delete("/deleteSerie/:id", authorization, seriesController.deleteSerie);

export default seriesRoutes;
