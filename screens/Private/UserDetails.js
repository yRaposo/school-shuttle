import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { darkTheme } from "../../styles/Global";
import { Icon } from "@rneui/base";
import StylizedInput from "../../components/StylizedInput";
import { useEffect, useState } from "react";
import { getUsuarioLogado } from "../../Services/UsuarioService";



export default function UserDetails({ navigation }) {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            console.log("Iniciando fetchUser...");
            setLoading(true);
            setError(null);
            try {
                const data = await getUsuarioLogado();
                console.log("Dados do usuário recebidos:", data);
                setUser(data);
            } catch (err) {
                console.error("Erro ao carregar dados do usuário:", err);
                setError("Erro ao carregar dados do usuário.");
            } finally {
                setLoading(false);
                console.log("Finalizando fetchUser. loading:", loading);
            }
        }
        fetchUser();
    }, []);

    const usuario = {
        nome: "Nome do Usuário",
        email: "usuario@email.com",
        cpf: "000.000.000-00",
        telefone: "(00) 00000-0000",
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.title}>Dados Pessoais</Text>
                </View>
                <View style={styles.imgContainer}>
                    <Icon name="person" size={100} color={darkTheme.textPrimary} />
                </View>
                <View style={styles.dataContainer}>
                    <StylizedInput
                        label="Nome"
                        placeholder={user.nome}
                        icon="person"
                        value={''}
                        onChangeText={() => { }}
                        editable={false}
                    />
                    <StylizedInput
                        label="Email"
                        placeholder={user.email}
                        icon="email"
                        value={''}
                        onChangeText={() => { }}
                        editable={false}
                    />
                    <StylizedInput
                        label="CPF"
                        placeholder={user.cpf}
                        icon="badge"
                        value={''}
                        onChangeText={() => { }}
                        editable={false}
                    />
                    <StylizedInput
                        label="Telefone"
                        placeholder={user.telefone}
                        icon="phone"
                        value={''}
                        onChangeText={() => { }}
                        editable={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
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
    dataContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: darkTheme.textPrimary,
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    text: {
        fontSize: 18,
        color: darkTheme.textSecondary,
    },
})