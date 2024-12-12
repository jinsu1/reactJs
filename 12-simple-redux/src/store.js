import { configureStore } from '@reduxjs/toolkit';

import CounterSlice from './slices/CounterSlice';

const store = configureStore({
    reducer: {
        CounterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;