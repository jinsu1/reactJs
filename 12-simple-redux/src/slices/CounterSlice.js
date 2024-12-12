import { createSlice } from '@reduxjs/toolkit'

const CounterSlice = createSlice({
    name: 'CounterSlice',
    initialState: {
        number: 0,
        color: '#000'
    },

    reducers: {
        plus: (state, action) => {
            const numberValue = state.number + action.payload;
            let colorValue = "#000";

            if(numberValue > 0) {
                colorValue = '#2f77eb';
            } else if (numberValue < 0) {
                colorValue = '#f60';
            }

            return {
                number: numberValue,
                color: colorValue
            }
        },

        minus: (state, action) => {
            const numberValue = state.number - action. payload;
            let colorValue = "#000";

            if(numberValue > 0) {
                colorValue = '#2f77eb';
            } else if (numberValue < 0) {
                colorValue = '#f60';
            }

            return {
                number: numberValue,
                color: colorValue
            }
        }
    }
});

export const { plus, minus } = CounterSlice.actions;

export default CounterSlice.reducer;