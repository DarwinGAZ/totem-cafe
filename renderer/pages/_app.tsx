import type { AppProps } from "next/app";
import Head from "next/head";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-dm-sans",
});

const cormorant = Cormorant_Garamond({
    weight: ["400", "500", "600", "700"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-cormorant",
});

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <main className={`${dmSans.variable} ${cormorant.variable} h-full`}>
            <Head>
                <title>Bistrô 57 | Café e comida afetiva</title>
                <meta
                    name="description"
                    content="Bistrô 57 — café e comida afetiva."
                />
            </Head>
            <Component {...pageProps} />
        </main>
    );
}

export default MyApp;
