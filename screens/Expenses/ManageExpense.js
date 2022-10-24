import { View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import { GlobalStyles } from "../../constants/styles";

import ExpensesForm from "../../components/ManageExpense/ExpenseForm";
import IconButton from "../../components/UI/IconButton";
import { deleteExpense } from "../../store/manageExpenseSlice";

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});

function ManageExpense({ route, navigation }) {
    const dispatch = useDispatch();

    const editedExpenseId = route.params?.expenseId;

    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        dispatch(deleteExpense(editedExpenseId));
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpensesForm
                navigation={navigation}
                editedExpenseId={editedExpenseId}
                isEditing={isEditing}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

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
