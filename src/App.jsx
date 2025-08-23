import { Provider } from "react-redux";
import Home from "./pages/user/Home.jsx";
import Routes from "./Routes";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Home/> */}
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
