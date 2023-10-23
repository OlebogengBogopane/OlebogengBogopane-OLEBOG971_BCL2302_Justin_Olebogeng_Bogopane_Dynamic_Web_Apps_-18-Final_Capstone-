import React from 'react';
import { supabase } from './components/SupaBase';

const login = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'github'
  })
}

export default function Navbar(prop ) {
    return (
        <nav className="nav">
            
           <div>
             <h1 a href="/" className="Site-title" >Podcast Corner</h1>

            <img href="/" className="logo"  src="https://www.svgrepo.com/show/474170/podcast.svg"/>
            
            </div>
        
          <div className="navigation">
             
                   <div>
                        <button className='SignIN' onClick={login}>Sign In</button>
                        <button className='SignOUT'onClick={() => supabase.auth.signOut()}>Sign Out</button>

                   </div>
                

             </div>
        </nav>
    )
}


