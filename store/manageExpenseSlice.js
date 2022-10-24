import { createSlice } from "@reduxjs/toolkit";

const manageExpenseSlice = createSlice({
    name: "expenses",
    initialState: [
        {
            id: "e1",
            description: "A pair of shoes",
            amount: 59.99,
            date: new Date("2021-12-19"),
        },
        {
            id: "e2",
            description: "A pair of trousers",
            amount: 99.99,
            date: new Date("2022-01-05"),
        },
        {
            id: "e3",
            description: "Some bananas",
            amount: 5.99,
            date: new Date("2022-02-03"),
        },
        {
            id: "e4",
            description: "A chairs",
            amount: 19.99,
            date: new Date("2022-03-06"),
        },
        {
            id: "e5",
            description: "Ocean",
            amount: 19.99,
            date: new Date("2022-03-06"),
        },
        {
            id: "e6",
            description: "Ocean",
            amount: 19.99,
            date: new Date("2022-10-17"),
        },
    ],
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload);
        },
        updateExpense: (state, action) => {
            const currentItemIndex = state.findIndex((item) => item.id === action.payload.id);
            state[currentItemIndex] = { ...action.payload };
        },
        deleteExpense: (state, action) => {
            state.splice(state.indexOf(action.payload), 1);
        },
    },
});

export const addExpense = manageExpenseSlice.actions.addExpense;
export const updateExpense = manageExpenseSlice.actions.updateExpense;
export const deleteExpense = manageExpenseSlice.actions.deleteExpense;
export default manageExpenseSlice.reducer;
