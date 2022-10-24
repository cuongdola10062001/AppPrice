import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

function AllExpenses() {
    const expensesCtx = useSelector((state) => state.manageExpenseHandler);
    return <ExpensesOutput expenses={expensesCtx} expensesPeriod="Total" />;
}

export default AllExpenses;
