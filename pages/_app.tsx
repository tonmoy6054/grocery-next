// import { SessionProvider } from "next-auth/react";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { store, persistor } from "@/redux/store";
// import "../styles/globals.css";
// import { ThemeProvider } from "next-themes";
// import { ToastContainer } from "react-toastify";

// function MyApp({ Component, pageProps }) {
//   return (
//     <SessionProvider session={pageProps.session}>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <ToastContainer />
//           <ThemeProvider attribute="class">
//             <Component {...pageProps} />
//           </ThemeProvider>
//         </PersistGate>
//       </Provider>
//     </SessionProvider>
//   );
// }

// export default MyApp;

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import { AppProps } from "next/app";
import localFont from "next/font/local";

// Load the font
const geistSans = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <ThemeProvider attribute="class">
            <div className={geistSans.variable}>
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
