import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { darkTheme } from "../../styles/Global";
import { useEffect, useState } from "react";
import { adicionarUsuarioResponsavel, cadastrarResponsavel, deletarResponsavel, getResponsaveisPorUsuario } from "../../Services/RespService";
import { getUsuarioLogado } from "../../Services/UsuarioService";
import StylizedButton from "../../components/StylizedButton";
import StylizedInput from "../../components/StylizedInput";

export default function RespMenuScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [responsavel, setResponsavel] = useState([]);
    const [nomeCrianca, setNomeCrianca] = useState("");
    const [endereco, setEndereco] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Carrega usuário logado e responsáveis
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Carregando usuário logado...");
                const usuario = await getUsuarioLogado();
                console.log("Usuário logado:", usuario);
                setUser(usuario);

                console.log("Buscando responsáveis do usuário...");
                const listaResponsaveis = await getResponsaveisPorUsuario();
                console.log("Responsáveis encontrados:", listaResponsaveis);
                setResponsavel(listaResponsaveis);
            } catch (err) {
                console.error("Erro ao carregar dados:", err);
                setError(err.message || "Erro ao carregar dados.");
            } finally {
                setLoading(false);
                console.log("Finalizou carregamento de dados.");
            }
        };
        loadData();
    }, []);

    // Cadastra nova criança/responsável
    const handleSubmit = async () => {
        console.log("Iniciando cadastro de responsável...");
        if (!nomeCrianca || !endereco) {
            setError("Preencha todos os campos.");
            console.warn("Campos obrigatórios não preenchidos.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // 1. Cadastra o responsável (criança)
            const responsavelData = {
                nomeCrianca: nomeCrianca,
                endereco: endereco,
            };
            console.log("Enviando dados para cadastrarResponsavel:", responsavelData);
            const responsavelCriado = await cadastrarResponsavel(responsavelData);
            console.log("Responsável criado:", responsavelCriado);

            // 2. Vincula o responsável ao usuário logado
            console.log("Enviando dados para adicionarUsuarioResponsavel:", responsavelCriado.id);
            await adicionarUsuarioResponsavel(responsavelCriado.id);
            console.log("Responsável vinculado ao usuário com sucesso.");

            // 3. Limpa campos e atualiza lista
            setNomeCrianca("");
            setEndereco("");
            console.log("Buscando lista atualizada de responsáveis...");
            const listaResponsaveis = await getResponsaveisPorUsuario();
            console.log("Lista de responsáveis atualizada:", listaResponsaveis);
            setResponsavel(listaResponsaveis);
        } catch (err) {
            setError(err.message || "Erro ao cadastrar responsável.");
            console.error("Erro ao cadastrar responsável:", err.response?.data?.message);
        } finally {
            setLoading(false);
            console.log("Finalizou processo de cadastro de responsável.");
        }
    };


    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar style="inverted" />
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Menu do Responsavel</Text>
                    <Text style={{ color: darkTheme.textPrimary, marginTop: 20 }}>Carregando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (responsavel.length === 0) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar style="inverted" />
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Menu do Responsavel</Text>
                    <Text style={styles.text}>
                        Você ainda não é um responsável.
                    </Text>
                    <StylizedInput
                        placeholder={'Digite o nome da criança'}
                        icon="person"
                        value={nomeCrianca}
                        onChangeText={(text) => setNomeCrianca(text)}
                    />
                    <StylizedInput
                        placeholder={'Digite o endereço'}
                        icon="location-on"
                        value={endereco}
                        onChangeText={(text) => setEndereco(text)}
                    />
                    <StylizedButton
                        title={"Cadastrar Criança"}
                        icon={"person-add"}
                        onPress={handleSubmit}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Menu do Responsavel</Text>
                <StylizedInput
                    label="Nome da Criança"
                    placeholder={responsavel[0].nomeCrianca}
                    icon="person"
                    value={''}
                    onChangeText={() => { }}
                    editable={false}
                />
                <StylizedInput
                    label="Endereço"
                    placeholder={responsavel[0].endereco}
                    icon="location-on"
                    value={''}
                    onChangeText={() => { }}
                    editable={false}
                />
                <StylizedButton
                    title={"Deletar dados da Criança"}
                    icon={"delete"}
                    onPress={() => {
                        try {
                            // Aqui você pode adicionar a lógica para deletar os dados da criança
                            console.log("Deletando dados da criança...");
                            deletarResponsavel(responsavel[0].id)
                                .then(() => {
                                    console.log("Dados da criança deletados com sucesso.");
                                    // Atualiza a lista de responsáveis após a exclusão
                                    setResponsavel([]);
                                    setNomeCrianca("");
                                    setEndereco("");
                                })
                                .catch((error) => {
                                    console.error("Erro ao deletar dados da criança:", error);
                                });
                        } catch (error) {
                            console.error("Erro ao deletar dados da criança:", error);
                        }
                    }}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: darkTheme.backGroundPrimary,
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: darkTheme.textPrimary,
        marginVertical: 20,
    },
    text: {
        fontSize: 16,
        color: darkTheme.textPrimary,
        marginVertical: 20,
        textAlign: "center",
    },
});