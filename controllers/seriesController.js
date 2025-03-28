import seriesService from "../services/seriesService.js";

// Fução para cadastrar uma nova série
const newSerie = async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await seriesService.create(title, description);
        res.status(201).json({
            message: "Série criada com sucesso!",
            // Informa dados inseridos (carregando o que retornou do service)
            inserção: {...result.data},
        }); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro ao criar série",
            error: error.message,
        }); // 500 Internal Server Error
    }
};

const createManySeries = async (req, res) => {
    const seriesData = req.body; // Espera um array de séries

    if (!Array.isArray(seriesData) || seriesData.length === 0) {
        res.status(400).json({
            success: false,
            message: "O payload deve ser um array não vazio de séries.",
        });
    }

    try {
        const result = await seriesService.createMany(seriesData);

        if (!result.success) {
            res.status(207).json({
                // 207 = Multi-Status
                message: "Algumas séries não foram criadas.",
                ...result,
            });
        }

        res.status(201).json({
            message: `${result.insertedCount} séries criadas com sucesso!`,
            data: result.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erro interno no servidor.",
            error: error.message,
        });
    }
};

// Função para buscar todas as séries
const getAllSeries = async (req, res) => {
    try {
        const series = await seriesService.getAll();
        if (series.length === 0) {
            return res
                .status(404)
                .json({ message: "Nenhuma série encontrada" }); // 404 Not Found
        } else {
            res.status(200).json(series); // 200 OK
        }
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar séries",
            error: "Erro interno do servidor",
        }); // 500 Internal Server Error
    }
};

// Função para buscar uma série pelo ID
const getOneSerie = async (req, res) => {
    const { id } = req.params;
    try {
        const serie = await seriesService.getOne(id);
        if (!serie) {
            res.status(404).json({ message: "Série não encontrada" }); // 404 Not Found
        } else {
            res.status(200).json(serie); // 200 OK
        }
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar série",
            error: "Erro interno do servidor",
        }); // 500 Internal Server Error
    }
};

// Função para atualizar uma série pelo ID
const updateSerie = async (req, res) => {
    const { id } = req.params;
    const { title, genre, rating, year } = req.body;
    try {
        await seriesService.update(id, title, genre, rating, year);
        res.status(200).json({ message: "Série atualizado com sucesso!" }); // 200 OK
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar série",
            error: "Erro interno do servidor",
        }); // 500 Internal Server Error
    }
};

// Função para deletar uma série pelo ID
const deleteSerie = async (req, res) => {
    const { id } = req.params;
    try {
        await seriesService.delete(id);
        res.sendStatus(204) // 204 No Content
    } catch (error) {
        res.status(500).json({
            message: "Erro ao deletar série",
            error: "Erro interno do servidor",
        });
    }
};

// exportando as funções para serem usadas no router
export default {
    newSerie,
    getAllSeries,
    getOneSerie,
    updateSerie,
    deleteSerie,
    createManySeries,
};
