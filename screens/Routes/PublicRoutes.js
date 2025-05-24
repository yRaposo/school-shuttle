import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native"; // Corrigido aqui

const Stack = createStackNavigator();

function Home() { // Mova para cima
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}

export default function PublicRoutes() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    );
}