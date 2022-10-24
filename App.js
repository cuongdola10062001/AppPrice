import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import store from "./store/store";
import { GlobalStyles } from "./constants/styles";

import LoginScreen from "./screens/Auth/LoginScreen";
import SignupScreen from "./screens/Auth/SignupScreen";

import AllExpenses from "./screens/Expenses/AllExpenses";
import RecentExpenses from "./screens/Expenses/RecentExpenses";
import ManageExpense from "./screens/Expenses/ManageExpense";

import IconButton from "./components/UI/IconButton";
import { logout } from "./store/authSlice";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary400,
                },
                headerTintColor: "white",
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}

function ExpensesBottom() {
    const dispatch = useDispatch();
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
                tabBarStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <View style={styles.iconWrapper}>
                        <IconButton
                            icon="add"
                            size={24}
                            color={tintColor}
                            onPress={() => navigation.navigate("ManageExpense")}
                        />
                        <IconButton
                            icon="log-out"
                            size={24}
                            color={tintColor}
                            onPress={() => {
                                dispatch(logout());
                            }}
                        />
                    </View>
                ),
            })}
        >
            <BottomTabs.Screen
                name="RecentExpenses"
                component={RecentExpenses}
                options={{
                    title: "Recent Expense",
                    tabBarLabel: "Recent Expense",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="hourglass" size={size} color={color} />
                    ),
                }}
            />
            <BottomTabs.Screen
                name="AllExpenses"
                component={AllExpenses}
                options={{
                    title: "All Expense",
                    tabBarLabel: "All Expense",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
}

function ExpensesContainer() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                },
                headerTintColor: "white",
            }}
        >
            <Stack.Screen
                name="ExpensesBottom"
                component={ExpensesBottom}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ManageExpense"
                component={ManageExpense}
                options={{ presentation: "modal" }}
            />
        </Stack.Navigator>
    );
}

function Navigation() {
    const authCtx = useSelector((state) => state.authHandler);
    return (
        <NavigationContainer>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <ExpensesContainer />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <Provider store={store}>
                <StatusBar style="light" />
                <Navigation />
            </Provider>
        </>
    );
}

const styles = StyleSheet.create({
    container: {},
    iconWrapper: {
        flexDirection: "row",
    },
});
