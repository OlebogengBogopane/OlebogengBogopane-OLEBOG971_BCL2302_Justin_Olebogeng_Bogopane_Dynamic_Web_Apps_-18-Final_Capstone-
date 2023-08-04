import React from 'react'
import { supabase } from './SupaBase';

function SignIn() {


    React.useEffect(() => {
        const [signUpState, setSignUpState] = useState('SignPhase')

        const authListener = supabase.auth.onAuthStateChange((event, session) => {
          if (event === "SIGNED_IN" && session) {
            console.log("User signed in successfully:", session.user.email);
            setSignUpState('startPhase')
          }
        });
        return () => {
          authListener.unsubscribe;
        };
      }, [])

  return (
    <div>
 {signUpState ==='SignPhase' && <Supa />}
      { signUpState ==='startPhase' && <div className="app"></div>}

    </div>
  )
}

export default SignIn