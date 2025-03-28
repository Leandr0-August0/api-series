import Series from "../models/series.js";

// Função para criar uma nova série
class seriesServise {
    async create(title, description) {
        try {
            const newSerie = new Series({
                title,
                description,
            });
            await newSerie.save();
            return {
                data: newSerie._doc,
            };
        } catch (error) {
            console.log(error);
            // Se houver erros de validação, retorna os documentos que falharam
            if (error.writeErrors) {
                const failedDocuments = error.writeErrors.map(
                    (err) => err.err.op
                );
                return {
                    success: false,
                    insertedCount: error.insertedDocs.length,
                    failedDocuments,
                    error: "Alguns documentos falharam na validação.",
                };
            }
            throw error; // Propaga outros erros (ex: conexão com o banco)
        }
    }

    async createMany(seriesArray) {
        try {
            const result = await Series.insertMany(seriesArray, {
                ordered: false,
            });
            return {
                success: true,
                insertedCount: result.length,
                data: result,
            };
        } catch (error) {
            // Se houver erros de validação, retorna os documentos que falharam
            if (error.writeErrors) {
                const failedDocuments = error.writeErrors.map(
                    (err) => err.err.op
                );
                return {
                    success: false,
                    insertedCount: error.insertedDocs.length,
                    failedDocuments,
                    error: "Alguns documentos falharam na validação.",
                };
            }
            throw error; // Propaga outros erros (ex: conexão com o banco)
        }
    }

    async getAll() {
        try {
            const series = await Series.find();
            return series;
        } catch (error) {
            console.log(error);
        }
    }

    async getOne(id) {
        try {
            const serie = await Series.findById(id);
            return serie;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, title, genre, rating, year) {
        try {
            await Series.findByIdAndUpdate(id, {
                title,
                genre,
                rating,
                year,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            await Series.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new seriesServise();
