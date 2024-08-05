'use client'
import { signIn, signOut, useSession } from "next-auth/react";
export function LoginUi() {

    const { data: session } = useSession();
    return <div>
        {!session ? (
            <>
                <button onClick={() => signIn("github")}>Sign in with GitHub</button>
            </>
        ) : (
            <>
                <p>Welcome, {session?.user?.name}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )}
    </div>
}