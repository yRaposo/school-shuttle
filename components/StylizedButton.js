import { Icon } from "@rneui/base";
import { Dimensions, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { darkTheme } from "../styles/Global";

export default function StylizedButton({ title, onPress, disabled, icon, secondary }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[
                styles.button,
                disabled ? styles.disabledButton : styles.enabledButton,
                secondary && {
                    backgroundColor: null,
                    borderColor: darkTheme.buttonSecondary,
                    borderWidth: 1,
                },
                { opacity: disabled ? 0.5 : 1 },
            ]}
        >
            <View style={styles.container}>
                <View>
                    <Text style={[styles.text,
                    secondary ? { color: darkTheme.textPrimary } : { color: darkTheme.textSecondary }]}>
                        {title}
                    </Text>
                </View>
                <View>
                    {icon && <Icon name={icon} size={20} color={secondary ? darkTheme.textPrimary : darkTheme.textSecondary} style={styles.icon} />}
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: darkTheme.buttonPrimary,
        borderRadius: 10,
        width: Dimensions.get("window").width * 0.8,
        alignContent: "center",
        justifyContent: "space-around",
        marginVertical: 5,
    },
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        gap: 10,
    },
    textContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#000',
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});