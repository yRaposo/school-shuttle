
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { darkTheme } from "../../styles/Global";

export default function LoginScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <View style={styles.mainContainer}>
                <View style={styles.logoContainer}></View>
                <View>
                    <Text style={styles.title}>ACESSO</Text>
                </View>
                <View style={styles.AuthContainer}>

                    <StylizedInput
                        placeholder={"Digite seu email"}
                        value={""}
                        onChangeText={() => { }}
                        icon={"email"}
                        error={""}
                        disabled={false}
                    />
                    <StylizedInput
                        placeholder={"Digite sua senha"}
                        secureTextEntry={true}
                        value={""}
                        onChangeText={() => { }}
                        icon={"lock"}
                        error={""}
                        disabled={false}
                    />
                    <StylizedButton
                        title={"Entrar"}
                        icon={"login"}
                        onPress={() => { }}
                        disabled={false}
                    />
                    <StylizedButton
                        title={"Não tem uma conta?"}
                        icon={"person-add"}
                        onPress={() => { navigation.popTo("Sign")}}
                        disabled={false}
                        secondary={true}
                    />

                    <TouchableOpacity
                        onPress={() => { }}
                        style={{
                            marginTop: 10,
                            alignSelf: "center",
                        }}
                    >
                        <Text style={{ color: darkTheme.textPrimary }}>
                            Esqueci minha senha
                        </Text>
                    </TouchableOpacity>

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
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: darkTheme.textPrimary,
        marginBottom: 20,
    },

})