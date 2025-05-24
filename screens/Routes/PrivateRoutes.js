import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native"; // Corrigido aqui
import LandPage from "../Public/LandPageScreen";
import Login from "../Public/LoginScreen";
import Sign from "../Public/SignScreen";
import Home from "../Private/HomeScreen";

const Stack = createStackNavigator();

export default function PrivateRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}