
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import * as Yup from "yup";

import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { darkTheme } from "../../styles/Global";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUsuario } from "../../Services/UsuarioService";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
});

export default function LoginScreen({ navigation }) {
    const { saveToken } = useContext(AuthContext);
    const [fields, setFields] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        console.log("Iniciando handleSubmit");
        setErrors({});
        setSubmitting(true);
        try {
            console.log("Validando campos:", fields);
            await validationSchema.validate(fields, { abortEarly: false });
            const loginDTO = {
                email: fields.email,
                senha: fields.password,
            };
            console.log("Enviando loginDTO:", loginDTO);
            const data = await loginUsuario(loginDTO);
            console.log("Login realizado com sucesso:", data);
            saveToken(data.token);
        } catch (err) {
            console.log("Erro no handleSubmit:", err);
            if (err instanceof Yup.ValidationError) {
                const newErrors = {};
                err.inner.forEach((e) => {
                    if (e.path && !newErrors[e.path]) newErrors[e.path] = e.message;
                });
                setErrors(newErrors);
                console.log("Erros de validação:", newErrors);
            } else if (
                err.message === "Cliente não encontrado no sistema" ||
                err.message === "Senha incorreta"
            ) {
                alert("Usuário não encontrado ou senha incorreta.");
                console.log("Usuário não encontrado ou senha incorreta.");
            } else {
                alert(
                    err.response?.data?.message || 'Erro ao realizar login. Tente novamente.'
                );
                console.log("Outro erro:", err.response?.data?.message);
            }
        } finally {
            setSubmitting(false);
            console.log("Finalizando handleSubmit");
        }
    };

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
                        value={fields.email}
                        onChangeText={(text) => setFields({ ...fields, email: text })}
                        icon={"email"}
                        error={errors.email || ""}
                        disabled={false}
                    />
                    <StylizedInput
                        placeholder={"Digite sua senha"}
                        secureTextEntry={true}
                        value={fields.password}
                        onChangeText={(text) => setFields({ ...fields, password: text })}
                        icon={"lock"}
                        error={errors.password || ""}
                        disabled={false}
                    />
                    <StylizedButton
                        title={"Entrar"}
                        icon={"login"}
                        onPress={handleSubmit}
                        disabled={submitting}
                    />
                    <StylizedButton
                        title={"Não tem uma conta?"}
                        icon={"person-add"}
                        onPress={() => { navigation.popTo("Sign") }}
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