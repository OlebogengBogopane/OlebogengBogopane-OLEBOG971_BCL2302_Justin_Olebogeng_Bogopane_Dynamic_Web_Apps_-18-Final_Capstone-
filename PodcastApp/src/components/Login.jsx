import React from "react";


export default function Log() {
    const Login = async () => {
        await supabase.auth.signIn({
            provider: "github"
        });
    };

    useEffect(() => {
        const session = supabase.auth.session();
        console.log(session)
    }, [])



return (
    <div>

        <button onClick={Login}>Login with GITHUB</button>
    </div>
)
}