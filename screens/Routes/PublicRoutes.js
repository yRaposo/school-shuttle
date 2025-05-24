import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";

const Stack = createStackNavigator();

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

export function Home() {
    return (
        <View>
            <Text>Home</Text>
        </View>
    );
}