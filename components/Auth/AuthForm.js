import { View, Alert } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { authenticate } from "../../store/authSlice";
import { createUser, login } from "../../util/auth";
import Input from "../ManageExpense/Input";
import Button from "../UI/Button";

function AuthForm({ isLogin }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [inputs, setInputs] = useState({
        email: {
            value: "",
            isValid: true,
        },
        confirmEmail: {
            value: "",
            isValid: true,
        },
        password: {
            value: "",
            isValid: true,
        },
        confirmPassword: {
            value: "",
            isValid: true,
        },
    });

    function inputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((prev) => {
            return {
                ...prev,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            };
        });
    }

    async function submidHandler() {
        let { email, confirmEmail, password, confirmPassword } = inputs;

        const emailIsValid = email.value.includes("@");
        const passwordIsValid = password.value.length > 6;
        const confirmEmailIsValid =
            email.value === confirmEmail.value && confirmEmail.value.length > 0;
        const confirmPasswordIsValid =
            password.value === confirmPassword.value && confirmPassword.value.length > 0;

        if (
            !emailIsValid ||
            !passwordIsValid ||
            (!isLogin && (!confirmEmailIsValid || !confirmPasswordIsValid))
        ) {
            setInputs((curInputs) => {
                return {
                    email: { value: curInputs.email.value, isValid: emailIsValid },
                    password: { value: curInputs.password.value, isValid: passwordIsValid },
                    confirmEmail: {
                        value: curInputs.confirmEmail.value,
                        isValid: confirmEmailIsValid,
                    },
                    confirmPassword: {
                        value: curInputs.confirmPassword.value,
                        isValid: confirmPasswordIsValid,
                    },
                };
            });
        }

        if (isLogin) {
            try {
                const token = await login(email.value, password.value);
                dispatch(authenticate(token));
            } catch (error) {
                Alert.alert(
                    "Authentication failed!",
                    "Could not log you in. Please check your credentials or try again later!"
                );
            }
        } else {
            try {
                const token = await createUser(email.value, password.value);
                navigation.replace("Login");
            } catch (error) {
                Alert.alert(
                    "Authentication failed!",
                    "Could not log you in. Please check your credentials or try again later!"
                );
            }
        }
    }

    return (
        <View>
            <Input
                label="Email Address"
                invalid={!inputs.email.isValid}
                textInputConfig={{
                    placeholder: "a@gmail.com",
                    value: inputs.email.value,
                    onChangeText: inputChangeHandler.bind(this, "email"),
                }}
            />
            {!isLogin && (
                <Input
                    label="Confirm Email Address"
                    invalid={!inputs.confirmEmail.isValid}
                    textInputConfig={{
                        value: inputs.confirmEmail.value,
                        onChangeText: inputChangeHandler.bind(this, "confirmEmail"),
                    }}
                />
            )}
            <Input
                label="Password"
                invalid={!inputs.password.isValid}
                textInputConfig={{
                    value: inputs.password.value,
                    onChangeText: inputChangeHandler.bind(this, "password"),
                }}
                secure
            />
            {!isLogin && (
                <Input
                    label="Confirm Password"
                    invalid={!inputs.confirmPassword.isValid}
                    textInputConfig={{
                        value: inputs.confirmPassword.value,
                        onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
                    }}
                    secure
                />
            )}
            <View>
                <Button onPress={submidHandler}>{isLogin ? "Login" : "Sign up"}</Button>
            </View>
        </View>
    );
}

export default AuthForm;
