import { PropsWithChildren } from "react";

import { Footer } from "../footer";
import { Header } from "../header";

export const Layout = ({ children }) => {
    return (
        <div>
            <Header />
            <div
                style={{
                    paddingTop: "48px",
                    display: "flex",
                    backgroundColor: "rgb(0, 128, 128)",
                    minHeight: "100vh",
                }}
            >
                {children}
            </div>
            <Footer />
        </div>
    );
};
