import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import StylizedButton from "../../components/StylizedButton";
import { StatusBar } from "expo-status-bar";
import { darkTheme } from "../../styles/Global";

export default function LandPage({ navigation }) {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="black" />
            <View style={styles.mainContainer}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../assets/logoImg/SchoolShuttleAlt.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.authContainer}>
                    <View style={styles.buttonContainer}>
                        <StylizedButton
                            title={"Registrar-se"}
                            icon={"person-add"}
                            onPress={() => { navigation.navigate("Sign") }}
                        />
                        <StylizedButton
                            title={"Entrar"}
                            icon={"login"}
                            onPress={() => { navigation.navigate("Login") }}
                            secondary={true}
                        />
                    </View>
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

    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 300,
        height: 300,
    },

    authContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 0,
        backgroundColor: darkTheme.backGroundPrimary,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    buttonContainer: {
        alignItems: "center",
        marginBottom: 30,
    },
})