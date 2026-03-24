// app/provider.tsx
"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";

type ProviderProps = React.ComponentProps<typeof NextThemesProvider>;

// const {user} =useUser();

// const createNewUser=()=>{

// }

function Provider({ children, ...props }: ProviderProps) {
    
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default Provider;