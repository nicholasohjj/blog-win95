import React, { useState } from "react";
import { useLogout, useNavigation } from "@refinedev/core";
import { AppBar, Toolbar, Button, MenuList, MenuListItem } from "react95";

export const Footer = () => {
    const [open, setOpen] = useState(false);

    const { mutate: logout } = useLogout();
    const { push } = useNavigation();

    return (
        <AppBar style={{ top: "unset", bottom: 0 }}>
            <Toolbar style={{ justifyContent: "space-between" }}>
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Button
                        onClick={() => setOpen(!open)}
                        active={open}
                        style={{ fontWeight: "bold" }}
                    >
                        <img
                            src="../../../images/logo.png"
                            alt="rvrc-logo"
                            style={{ height: "20px", marginRight: 4 }}
                        />
                    </Button>
                    {open && (
                        <MenuList
                            style={{
                                position: "absolute",
                                left: "0",
                                bottom: "100%",
                            }}
                            onClick={() => setOpen(false)}
                        >
                            <MenuListItem
                                onClick={() => {
                                    push("houses");
                                }}
                            >
                                Scoreboard
                            </MenuListItem>
                            <MenuListItem
                                onClick={() => {
                                    push("activities");
                                }}
                            >
                                My Progress
                            </MenuListItem>
                            <MenuListItem
                                onClick={() => {
                                    logout();
                                }}
                            >
                                <span role="img" aria-label="🔙">
                                    🔙
                                </span>
                                Logout
                            </MenuListItem>
                        </MenuList>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};
