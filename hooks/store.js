import { configureStore } from "@reduxjs/toolkit";
// import localizationReducer from "./Localization";
// import VariableReducer from "./variables";
import authorizationReducer from "./authorizationReducer";
import blogersRedux from "./blogersRedux";
import favoritRducer from "./favoritesReducer";
import categoriesRedux from "./categories";
import langRedux from "./languageReducer";
import filterationRedux from "./FilterationRedux";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
	key: "root",
	version: 1,
    storage: AsyncStorage,
};

const RootReducers = combineReducers({
	// currentLocal: localizationReducer,
	favoritRducer:favoritRducer,
	authorization: authorizationReducer,
	blogers: blogersRedux,
	categories: categoriesRedux,
	filteration: filterationRedux,


	lang: langRedux,
});

const persistedReducer = persistReducer(persistConfig, RootReducers);

export default configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});