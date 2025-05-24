import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native"; // Corrigido aqui
import LandPage from "../Public/LandPageScreen";
import Login from "../Public/LoginScreen";

const Stack = createStackNavigator();

export default function PublicRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="LandPage"
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="LandPage" component={LandPage} />
            <Stack.Screen name="Login" component={Login}/>
        </Stack.Navigator>
    );
}