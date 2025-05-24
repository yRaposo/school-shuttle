
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style="inverted" />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: "#161616",
    },

})