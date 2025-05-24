import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import * as Yup from "yup";

import StylizedInput from "../../components/StylizedInput";
import StylizedButton from "../../components/StylizedButton";
import { darkTheme } from "../../styles/Global";
import { cadastrarUsuario } from "../../Services/UsuarioService";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    password: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "As senhas não coincidem"),
    phone: Yup.string().required("Telefone é obrigatório"),
    cpf: Yup.string().required("CPF é obrigatório"),
})

export default function SignScreen({ navigation }) {
    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        cpf: "",
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (field, value) => {
        setFields({ ...fields, [field]: value });
        setErrors({ ...errors, [field]: "" });
    };

    const handleSubmit = async () => {
        setErrors({});
        try {
            await validationSchema.validate(fields, { abortEarly: false });
            setSubmitting(true);
            const usuario = {
                nome: fields.name,
                email: fields.email,
                senha: fields.password,
                telefone: fields.phone,
                cpf: fields.cpf,
            };
            await cadastrarUsuario(usuario);
            setSubmitting(false);
            navigation.navigate("Login");
        } catch (err) {
            setSubmitting(false);
            if (err.name === "ValidationError") {
                const fieldErrors = {};
                err.inner.forEach(e => {
                    if (!fieldErrors[e.path]) fieldErrors[e.path] = e.message;
                });
                setErrors(fieldErrors);
            } else {
                setErrors({ general: err.message || "Erro ao registrar usuário" });
            }
        }
    };

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
                            value={fields.name}
                            onChangeText={value => handleChange("name", value)}
                            icon={"person"}
                            error={errors.name}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Digite seu Telefone"}
                            value={fields.phone}
                            onChangeText={value => handleChange("phone", value)}
                            icon={"phone"}
                            error={errors.phone}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Digite seu CPF"}
                            value={fields.cpf}
                            onChangeText={value => handleChange("cpf", value)}
                            icon={"fingerprint"}
                            error={errors.cpf}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Digite seu email"}
                            value={fields.email}
                            onChangeText={value => handleChange("email", value)}
                            icon={"email"}
                            error={errors.email}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Digite sua senha"}
                            secureTextEntry={true}
                            value={fields.password}
                            onChangeText={value => handleChange("password", value)}
                            icon={"lock"}
                            error={errors.password}
                            disabled={false}
                        />
                        <StylizedInput
                            placeholder={"Confirme sua senha"}
                            secureTextEntry={true}
                            value={fields.confirmPassword}
                            onChangeText={value => handleChange("confirmPassword", value)}
                            icon={"lock"}
                            error={errors.confirmPassword}
                            disabled={false}
                        />
                        {errors.general && (
                            <Text style={{ color: "red", marginBottom: 10 }}>{errors.general}</Text>
                        )}
                        <StylizedButton
                            title={"Registrar-se"}
                            icon={"person-add"}
                            onPress={handleSubmit}
                            disabled={submitting}
                        />
                        <StylizedButton
                            title={"Já tem uma conta?"}
                            icon={"login"}
                            onPress={() => { navigation.popTo("Login") }}
                            disabled={false}
                            secondary={true}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
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