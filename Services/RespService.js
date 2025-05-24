import { api } from "../libs/api";


export async function getTodosResponsaveis() {
    try {
        const response = await api.get('/responsavel');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter todos os responsáveis:", error);
        throw error;
    }
}

// Obtém responsáveis do usuário logado
export async function getResponsaveisPorUsuario() {
    try {
        const response = await api.get('/responsavel/usuario');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter responsáveis do usuário:", error);
        throw error;
    }
}

// Obtém responsável por ID
export async function getResponsavelPorId(id) {
    try {
        const response = await api.get(`/responsavel/${id}`, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter responsável por ID:", error);
        throw error;
    }
}

// Cadastra um novo responsável
export async function cadastrarResponsavel(responsavel) {
    try {
        const response = await api.post('/responsavel', responsavel);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar responsável:", error);
        throw error;
    }
}

// Adiciona usuário ao responsável
export async function adicionarUsuarioResponsavel(responsavelId) {
    try {
        const response = await api.post(`/responsavel/usuario/${responsavelId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar usuário ao responsável:", error);
        throw error;
    }
}

// Remove usuário do responsável
export async function removerUsuarioResponsavel(responsavel) {
    try {
        const response = await api.patch('/responsavel/usuario/desassociar', responsavel);
        return response.data;
    } catch (error) {
        console.error("Erro ao remover usuário do responsável:", error);
        throw error;
    }
}

// Atualiza responsável por ID
export async function atualizarResponsavel(id, responsavel) {
    try {
        const response = await api.patch(`/responsavel/${id}`, responsavel);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar responsável:", error);
        throw error;
    }
}

// Deleta responsável por ID
export async function deletarResponsavel(id) {
    try {
        const response = await api.delete(`/responsavel/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar responsável:", error);
        throw error;
    }
}