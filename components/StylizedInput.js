import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { Icon } from "@rneui/base";
import { darkTheme } from "../styles/Global";

export default function StylizedInput({ label, placeholder, value, onChangeText, secureTextEntry, icon, error, disabled, ...rest }) {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputWrapper, error && styles.errorBorder]}>
                <View style={styles.inputContainer}>
                    {icon && <Icon name={icon} size={20} color={darkTheme.textPrimary} style={styles.icon} />}
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChangeText}
                        secureTextEntry={secureTextEntry}
                        editable={!disabled}
                        placeholderTextColor={darkTheme.inputText}
                        {...rest}
                    />
                </View>
            </View>
            {error && <Text style={styles.errorMessage}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff",
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: darkTheme.inputText,
        borderRadius: 5,
        paddingHorizontal: 2,
        paddingVertical: 2,
        width: Dimensions.get("window").width * 0.8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        backgroundColor: darkTheme.inputBackground,
        borderRadius: 2.5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: darkTheme.textPrimary,
    },
    icon: {
        marginRight: 5,
        marginLeft: 5,
    },
    errorBorder: {
        borderColor: "red",
    },
    errorMessage: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});