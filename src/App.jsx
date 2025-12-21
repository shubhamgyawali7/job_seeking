import { Provider } from "react-redux";
import Home from "./pages/user/Home.jsx";
import Routes from "./Routes";
import { store, persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <Home/> */}
        <Routes />
         <Toaster reverseOrder={false}/>
        <ToastContainer />
       
      </PersistGate>
    </Provider>
  );
};

export default App;
