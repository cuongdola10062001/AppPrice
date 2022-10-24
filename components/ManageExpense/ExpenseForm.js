import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { updateExpense, addExpense } from "../../store/manageExpenseSlice";

function ExpensesForm({ isEditing, navigation, editedExpenseId }) {
    const dispatch = useDispatch();

    const expensesCtx = useSelector((state) => state.manageExpenseHandler);

    const dataItem = expensesCtx.find((item) => item.id === editedExpenseId);

    const [inputs, setInputs] = useState({
        amount: {
            value: dataItem ? dataItem.amount.toString() : "",
            isValid: true,
        },
        date: {
            value: dataItem ? dataItem.date.toISOString().slice(0, 10) : "",
            isValid: true,
        },
        description: {
            value: dataItem ? dataItem.description.toString() : "",
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

    function canceHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        const expenseData = {
            id: new Date(inputs.date.value).toString() + Math.random().toString(),
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== "Invalid Date";
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: {
                        value: curInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });

            return;
        }

        if (isEditing) {
            dispatch(updateExpense({ ...expenseData, id: editedExpenseId }));
        } else {
            dispatch(addExpense(expenseData));
        }
        navigation.goBack();
    }

    return (
        <View>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputWrapper}>
                <Input
                    label="Amount"
                    style={styles.rowInput}
                    textInputConfig={{
                        keyboardType: "decimal-pad",
                        onChangeText: inputChangeHandler.bind(this, "amount"),
                        value: inputs.amount.value,
                    }}
                    invalid={!inputs.amount.isValid}
                />
                <Input
                    label="Date"
                    style={styles.rowInput}
                    textInputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, "date"),
                        value: inputs.date.value,
                    }}
                    invalid={!inputs.date.isValid}
                />
            </View>
            <Input
                label="Description"
                style={styles.marginTopInput}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, "description"),
                    value: inputs.description.value,
                }}
                invalid={!inputs.description.isValid}
            />
            <View style={styles.buttonWrapper}>
                <Button mode="flat" style={styles.button} onPress={canceHandler}>
                    Cancel
                </Button>
                <Button style={styles.button} onPress={confirmHandler}>
                    {isEditing ? "Update" : "Add"}
                </Button>
            </View>
        </View>
    );
}

export default ExpensesForm;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        marginVertical: 16,
    },
    inputWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    rowInput: {
        flex: 1,
    },
    marginTopInput: {
        marginTop: 4,
        marginBottom: 0,
    },

    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "center",
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
        marginTop: 12,
    },
    buttonBack: {
        color: GlobalStyles.colors.error500,
    },
    errorText: {
        fontSize: 14,
        textAlign: "center",
        color: GlobalStyles.colors.error500,
        margin: 8,
        fontWeight: "bold",
    },
});
