import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { darkTheme } from "../../styles/Global";

export default function SignScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
            <ScrollView>
                <View style={styles.mainContainer}>
                    <View>
                        <Text style={styles.title}>REGISTRO</Text>
                    </View>
                    <View style={styles.AuthContainer}>

                        <StylizedInput
                            placeholder={"Digite seu nome"}
                            value={""}
                            onChangeText={() => { }}
                            icon={"person"}
                            error={""}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Digite seu Telefone"}
                            value={""}
                            onChangeText={() => { }}
                            icon={"phone"}
                            error={""}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Digite seu CPF"}
                            value={""}
                            onChangeText={() => { }}
                            icon={"fingerprint"}
                            error={""}
                            disabled={false}
                        />
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
                        <StylizedInput
                            placeholder={"Confirme sua senha"}
                            secureTextEntry={true}
                            value={""}
                            onChangeText={() => { }}
                            icon={"lock"}
                            error={""}
                            disabled={false}
                        />
                        <StylizedButton
                            title={"Registrar-se"}
                            icon={"person-add"}
                            onPress={() => { }}
                            disabled={false}
                        />
                        <StylizedButton
                            title={"Já tem uma conta?"}
                            icon={"login"}
                            onPress={() => { navigation.popTo("Login")}}
                            disabled={false}
                            secondary={true}
                        />
                    </View>
                </View>
            </ScrollView>
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
        marginTop: 100,
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