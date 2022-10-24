import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { GlobalStyles } from "../../constants/styles";

import AuthForm from "./AuthForm";
import FlatButton from "../UI/FlatButton";

function AuthContent({ isLogin, onAuthenticate }) {
    const navigation = useNavigation();

    function switchAuthModeHandler() {
        if (isLogin) {
            navigation.replace("Signup");
        } else {
            navigation.replace("Login");
        }
    }

    return (
        <View style={styles.container}>
            <AuthForm isLogin={isLogin} />
            <View style={styles.flatButton}>
                <FlatButton onPress={switchAuthModeHandler}>
                    {isLogin ? "Create a new user" : "Log in instead"}
                </FlatButton>
            </View>
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    container: {
        marginTop: 64,
        marginHorizontal: 32,
        padding: 16,
        borderRadius: 8,
        backgroundColor: GlobalStyles.colors.primary800,
        elevation: 2,
        shadowColor: "black",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
    },
    flatButton: {
        marginTop: 8,
    },
});
