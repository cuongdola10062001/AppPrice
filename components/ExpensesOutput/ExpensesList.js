import { FlatList } from "react-native";
import ExpensesItem from "./ExpensesItem";

function ExpensesList({ expenses }) {
    function renderExpenseItem(itemData) {
        return <ExpensesItem {...itemData.item} />;
    }

    return (
        <FlatList data={expenses} renderItem={renderExpenseItem} keyExtractor={(item) => item.id} />
    );
}

export default ExpensesList;
