import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

import ExpenseSummary from "./ExpenseSummary";
import ExpensesList from "./ExpensesList";

function ExpensesOutput({ expenses, expensesPeriod }) {
    const emptyItem = !expenses.length;
    return (
        <View style={styles.container}>
            <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
            {emptyItem && (
                <View style={styles.textContainer}>
                    <Text style={styles.emptyItem}>No expenses registered found</Text>
                </View>
            )}
            <ExpensesList expenses={expenses} />
        </View>
    );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    textContainer: {
        alignItems: "center",
        marginTop: 16,
    },
    emptyItem: {
        color: "white",
        fontSize: 16,
    },
});
