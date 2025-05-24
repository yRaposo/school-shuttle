import { api } from '../libs/api';

// filepath: C:/Users/Voltage/Documents/Projetos/SS/mobile/school-shuttle/Services/UsuarioService.js

// Obtém dados do usuário logado
export async function getUsuarioLogado() {
    const response = await api.get('/usuario');
    return response.data;
}

// Obtém todos os usuários
export async function getTodosUsuarios() {
    const response = await api.get('/usuario/all');
    return response.data;
}

// Cadastra um novo usuário
export async function cadastrarUsuario(usuario) {
    const response = await api.post('/usuario', usuario);
    return response.data;
}

// Efetua login e retorna token
export async function loginUsuario(loginDTO) {
    const response = await api.post('/usuario/login', loginDTO);
    return response.data;
}

// Atualiza dados do usuário logado
export async function atualizarUsuario(usuario) {
    const response = await api.put('/usuario', usuario);
    return response.data;
}

// Deleta o usuário logado
export async function deletarUsuario() {
    await api.delete('/usuario');
}