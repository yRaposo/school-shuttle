import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { darkTheme } from "../../styles/Global";
import { useEffect, useState } from "react";
import {
    adicionarUsuarioMotorista,
    cadastrarMotorista,
    deletarMotorista,
    getMotoristasPorUsuario
} from "../../Services/MotorService";
import { getUsuarioLogado } from "../../Services/UsuarioService";
import StylizedButton from "../../components/StylizedButton";
import StylizedInput from "../../components/StylizedInput";

export default function MotorMenuScreen({ navigation }) {
    const [user, setUser] = useState(null);
    const [motorista, setMotorista] = useState([]);
    const [placaDoVeiculo, setPlacaDoVeiculo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Carrega usuário logado e motoristas
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const usuario = await getUsuarioLogado();
                setUser(usuario);

                const listaMotoristas = await getMotoristasPorUsuario();
                setMotorista(listaMotoristas);
            } catch (err) {
                setError(err.message || "Erro ao carregar dados.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Cadastra novo motorista
    const handleSubmit = async () => {
        if (!placaDoVeiculo) {
            setError("Preencha todos os campos.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            // 1. Cadastra o motorista (apenas placaDoVeiculo)
            const motoristaData = {
                placaDoVeiculo: placaDoVeiculo,
            };
            const motoristaCriado = await cadastrarMotorista(motoristaData);

            // 2. Vincula o motorista ao usuário logado
            await adicionarUsuarioMotorista({ id: motoristaCriado.id });

            // 3. Limpa campos e atualiza lista
            setPlacaDoVeiculo("");
            const listaMotoristas = await getMotoristasPorUsuario();
            setMotorista(listaMotoristas);
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao cadastrar motorista.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar style="inverted" />
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Menu do Motorista</Text>
                    <Text style={{ color: darkTheme.textPrimary, marginTop: 20 }}>Carregando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (motorista.length === 0) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <StatusBar style="inverted" />
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>Menu do Motorista</Text>
                    <Text style={styles.text}>
                        Você ainda não é um motorista.
                    </Text>
                    <StylizedInput
                        placeholder={'Digite a placa do veículo'}
                        icon="directions-car"
                        value={placaDoVeiculo}
                        onChangeText={setPlacaDoVeiculo}
                    />
                    <StylizedButton
                        title={"Cadastrar Motorista"}
                        icon={"person-add"}
                        onPress={handleSubmit}
                    />
                    {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Menu do Motorista</Text>
                <StylizedInput
                    label="Placa do Veículo"
                    placeholder={motorista[0].placaDoVeiculo}
                    icon="directions-car"
                    value={''}
                    onChangeText={() => { }}
                    editable={false}
                />
                <StylizedButton
                    title={"Deletar dados do Motorista"}
                    icon={"delete"}
                    onPress={() => {
                        try {
                            deletarMotorista(motorista[0].id)
                                .then(() => {
                                    setMotorista([]);
                                    setPlacaDoVeiculo("");
                                })
                                .catch((error) => {
                                    setError(error.message || "Erro ao deletar motorista.");
                                });
                        } catch (error) {
                            setError(error.response?.data?.message || "Erro ao deletar motorista.");
                        }
                    }}
                />
                {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
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
