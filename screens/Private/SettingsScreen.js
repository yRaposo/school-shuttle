import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { darkTheme } from "../../styles/Global";
import StylizedButton from "../../components/StylizedButton";

export default function SettingsScreen({ navigation }) {
    const { logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.title}>Opções</Text>
                </View>
                <View style={styles.LogoutContainer}>
                    <StylizedButton
                        title={"Dados Pessoais"}
                        icon={"person"}
                        onPress={() => {navigation.navigate("UserDetails")}}
                        disabled={false}
                        secondary={false}
                    />
                    <StylizedButton
                        title={"Menu do Responsável"}
                        icon={"people"}
                        onPress={() => {navigation.navigate("RespMenu")}}
                        disabled={false}
                        secondary={false}
                    />
                    <StylizedButton
                        title={"Menu do Motorista"}
                        icon={"drive-eta"}
                        onPress={() => {navigation.navigate("MotorMenu")}}
                        disabled={false}
                        secondary={false}
                    />
                    <StylizedButton
                        title={"Sair"}
                        icon={"logout"}
                        onPress={() => {logout()}}
                        disabled={false}
                        secondary={true}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: darkTheme.backGroundPrimary,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: darkTheme.textPrimary,
    },
    LogoutContainer: {
        width: "80%",
        marginTop: 20,
    },
});