import { StyleSheet, View } from "react-native";

import { GlobalStyles } from "../../constants/styles";

import AuthContent from "../../components/Auth/AuthContent";

function LoginScreen() {
    return (
        <View style={styles.container}>
            <AuthContent isLogin />
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
