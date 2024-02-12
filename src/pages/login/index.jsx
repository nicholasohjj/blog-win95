import { useState } from "react";
import { useLogin } from "@refinedev/core";

import {
    Window,
    WindowHeader,
    WindowContent,
    TextInput,
    Button,
} from "react95";


export const LoginPage = () => {
    const [email, setemail] = useState("e1234567@u.nus.edu");
    const [password, setPassword] = useState("ensieme-supabase");

    const { mutate: login } = useLogin();

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
                backgroundColor: "rgb(0, 128, 128)",
            }}
        >
            <Window>
                <WindowHeader>
                    <span>Welcome to Ensieme</span>
                </WindowHeader>
                <div style={{ marginTop: 8 }}>
                    <img
                        src="../../../images/logo.png"
                        alt="rvrc-logo"
                        width={100}
                    />
                </div>
                <WindowContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login({ email, password });
                        }}
                    >
                        <div style={{ width: 500 }}>
                            <div style={{ display: "flex" }}>
                                <TextInput
                                    placeholder="User Name"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => {
                                        setemail(e.target.value);
                                    }}
                                />
                            </div>
                            <br />
                            <TextInput
                                placeholder="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <br />
                            <Button type="submit" value="login">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </WindowContent>
            </Window>
        </div>
    );
};
