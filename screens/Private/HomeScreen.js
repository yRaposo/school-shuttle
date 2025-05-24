import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { darkTheme } from "../../styles/Global";
import StylizedButton from "../../components/StylizedButton";

export default function HomeScreen({ navigation }) {
    const { logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.title}>Home Screen</Text>
                </View>
                <View style={styles.AuthContainer}>
                    <StylizedButton
                        title={"Sair"}
                        icon={"logout"}
                        onPress={() => {logout()}}
                        disabled={false}
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
        backgroundColor: darkTheme.backGroundSecondary,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: darkTheme.textPrimary,
    },
    AuthContainer: {
        width: "80%",
        marginTop: 20,
    },
});