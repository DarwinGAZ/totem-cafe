import type { AppProps } from "next/app";
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-poppins",
});

const montserrat = Montserrat({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
    variable: "--font-montserrat",
});

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={`${poppins.variable} ${montserrat.variable} h-full`}>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
