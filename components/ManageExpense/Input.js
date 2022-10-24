import { View, TextInput, Text, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, invalid, secure, textInputConfig }) {
    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline);
    }
    if (invalid) {
        inputStyles.push(styles.invalidInput);
    }

    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} secureTextEntry={secure} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 6,
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        fontSize: 18,
        borderRadius: 6,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: "center",
    },
    invalidLabel: {
        color: GlobalStyles.colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.colors.error50,
    },
});
