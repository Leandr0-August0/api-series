import mongoose from "mongoose";

const descriptionSchema = new mongoose.Schema({
    genre: [String],
    rating: String,
    eps: String,
    year: Number,
});

const seriesSchema = new mongoose.Schema({
    title: String,
    description: descriptionSchema,
});

// Cria a coleção Series no banco de dados
const Series = mongoose.model("Series", seriesSchema);

export default Series;
