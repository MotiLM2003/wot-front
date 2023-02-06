import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "../styles/confirmation.css";
import "../styles/buttons.css";
import theme from "../styles/theme.css";
import store, { wrapper } from "../store/store";
import { ToastContainer } from "react-toastify";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
