import { api } from '../libs/api';

// filepath: C:/Users/Voltage/Documents/Projetos/SS/mobile/school-shuttle/Services/UsuarioService.js

// Obtém dados do usuário logado
export async function getUsuarioLogado() {
    try {
        const response = await api.get('/usuario');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter dados do usuário logado:", error);
        throw error;
    }
}

// Obtém todos os usuários
export async function getTodosUsuarios() {
    try {
        const response = await api.get('/usuario/todos');
        return response.data;
    } catch (error) {
        console.error("Erro ao obter todos os usuários:", error);
        throw error;
    }
}

// Cadastra um novo usuário
export async function cadastrarUsuario(usuario) {
    try {
        const response = await api.post('/usuario', usuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw error;
    }
}

// Efetua login e retorna token
export async function loginUsuario(loginDTO) {
    try {
        const response = await api.post('/usuario/login', loginDTO);
        return response.data;
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        throw error;
    }
}

// Atualiza dados do usuário logado
export async function atualizarUsuario(usuario) {
    try {
        const response = await api.put('/usuario', usuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        throw error;
    }
}

// Deleta o usuário logado
export async function deletarUsuario() {
    try {
        const response = await api.delete('/usuario');
        return response.data;
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        throw error;
    }
}