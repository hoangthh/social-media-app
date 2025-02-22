import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import reducers from "./redux/reducers";
import mySaga from "./redux/sagas";
import { configureStore } from "@reduxjs/toolkit";
import { SocketProvider } from "./socket/SocketProvider";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers, // Root reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["createPostRequest"], // Thêm action mà bạn muốn bỏ qua kiểm tra serializability
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SocketProvider>
      <App />
    </SocketProvider>
  </Provider>
);
