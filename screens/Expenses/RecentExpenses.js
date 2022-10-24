import ExpensesOutput from "../../components/ExpensesOutput/ExpensesOutput";
import { useSelector } from "react-redux";

import { getDateMinusDays } from "../../util/date";

function RecentExpenses() {
    const expensesCtx = useSelector((state) => state.manageExpenseHandler);

    const recentExpenses = expensesCtx.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });

    return <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />;
}

export default RecentExpenses;
