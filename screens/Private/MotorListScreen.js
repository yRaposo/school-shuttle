import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, ActivityIndicator } from "react-native";
import { darkTheme } from "../../styles/Global";
import { getTodosMotoristas } from "../../Services/MotorService";

export default function MotorListScreen() {
    const [motoristas, setMotoristas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMotoristas() {
            try {
                const data = await getTodosMotoristas();
                setMotoristas(data);
            } catch (error) {
                // Adicione um alerta ou mensagem de erro se desejar
            } finally {
                setLoading(false);
            }
        }
        fetchMotoristas();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.username}>
                {item.usuario?.username || "Sem usuário"}
            </Text>
            <Text style={styles.placa}>
                Placa: {item.placaCarro || "Não informado"}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeAreaViewContainer}>
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Motoristas</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={darkTheme.textPrimary} />
                ) : (
                    <FlatList
                        data={motoristas}
                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaViewContainer: {
        flex: 1,
        backgroundColor: darkTheme.backGroundPrimary,
    },
    mainContainer: {
        marginTop: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: darkTheme.textPrimary,
        marginBottom: 20,
    },
    card: {
        backgroundColor: darkTheme.cardBackground,
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        width: "90%",
        alignSelf: "center",
    },
    username: {
        color: darkTheme.textPrimary,
        fontWeight: "bold",
        fontSize: 18,
    },
    placa: {
        color: darkTheme.textSecondary,
        fontSize: 16,
    },
});