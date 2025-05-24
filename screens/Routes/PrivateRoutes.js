import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native"; // Corrigido aqui
import LandPage from "../Public/LandPageScreen";
import Login from "../Public/LoginScreen";
import Sign from "../Public/SignScreen";
import SettingsScreen from "../Private/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { darkTheme } from "../../styles/Global";
import UserDetails from "../Private/UserDetails";
import RespMenuScreen from "../Private/RespMenuScreen";
import MotorMenuScreen from "../Private/MotorMenuScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function PrivateRoutes() {
    return (
        <RootStack />
    );
}

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="RootTabs"
            screenOptions={{
                headerTransparent: true,
                headerTitle: '',
                headerTintColor: '#fff',
            }}
        >
            <Stack.Screen name="RootTabs" component={RootTabs} />
        </Stack.Navigator>
    )
}

function RootTabs() {
    return (
        <Tab.Navigator
            initialRouteName='Opções'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Opções') {
                        iconName = 'cog';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: darkTheme.backGroundSecondary,
                tabBarInactiveTintColor: darkTheme.textPrimary,
                tabBarStyle: {
                    backgroundColor: '#252A2D',
                    borderTopWidth: 0,
                },
                headerTransparent: true,
                headerTitle: '',
            })}
        >
            <Stack.Screen name="Opções" component={SettingsStack} />
        </Tab.Navigator>

    )
}

function SettingsStack() {
    return (
        <Stack.Navigator
            initialRouteName="Opções"
            screenOptions={{
                headerTransparent: false,
                headerTitle: '',
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: darkTheme.backGroundPrimary,
                },
            }}
        >
            <Stack.Screen name="Opções" component={SettingsScreen} />
            <Stack.Screen name="UserDetails" component={UserDetails} />
            <Stack.Screen name="RespMenu" component={RespMenuScreen} />
            <Stack.Screen name="MotorMenu" component={MotorMenuScreen} />
        </Stack.Navigator>
    )
}