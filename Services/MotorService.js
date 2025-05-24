import { api } from '../libs/api';

// filepath: C:/Users/Voltage/Documents/Projetos/SS/mobile/school-shuttle/Services/MotorService.js

// Obtém todos os motoristas
export async function getTodosMotoristas() {
    try {
        const response = await api.get('/motorista');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter todos os motoristas:", error);
        throw error;
    }
}

// Obtém motoristas do usuário logado
export async function getMotoristasPorUsuario() {
    try {
        const response = await api.get('/motorista/usuario');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter motoristas do usuário:", error);
        throw error;
    }
}

// Obtém motorista por ID
export async function getMotoristaPorId(id) {
    try {
        const response = await api.get(`/motorista/${id}`, { params: { id } });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter motorista por ID:", error);
        throw error;
    }
}

// Cadastra um novo motorista
export async function cadastrarMotorista(motorista) {
    try {
        const response = await api.post('/motorista', motorista);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar motorista:", error);
        throw error;
    }
}

// Adiciona usuário ao motorista
export async function adicionarUsuarioMotorista(motorista) {
    try {
        const response = await api.post('/motorista/usuario', motorista);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar usuário ao motorista:", error);
        throw error;
    }
}

// Remove usuário do motorista
export async function removerUsuarioMotorista(motorista) {
    try {
        const response = await api.patch('/motorista/usuario/desassociar', motorista);
        return response.data;
    } catch (error) {
        console.error("Erro ao remover usuário do motorista:", error);
        throw error;
    }
}

// Atualiza motorista por ID
export async function atualizarMotorista(id, motorista) {
    try {
        const response = await api.patch(`/motorista/${id}`, motorista);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar motorista:", error);
        throw error;
    }
}

// Deleta motorista por ID
export async function deletarMotorista(id) {
    try {
        const response = await api.delete(`/motorista/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar motorista:", error);
        throw error;
    }
}