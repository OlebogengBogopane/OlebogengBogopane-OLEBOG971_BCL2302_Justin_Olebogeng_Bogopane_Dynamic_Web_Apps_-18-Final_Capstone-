/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import "./App.css";
import './index.css'
import Navbar from './Navbar'
 import Sort from './components/Sort'
import { supabase } from './components/SupaBase';
import SignIn from './components/SignIn'
import Swiper from './components/Swiper';
import FetchEpisode from './components/FetchEpisode'

function Main () {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null)
  const [sortBy,setSortBy] = useState('default')
  const[searchQuery, setSearchQuery] = useState('')
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')
  //const [user, setUser] = useState(null)

  // React.useEffect(() => {
  //   const authListener = supabase.auth.onAuthStateChange((event, session) => {
  //     if (event === "SIGNED_IN" && session) {
  //       console.log("User signed in successfully:", session.user.email);
  //       setThrowSignUp('PreviewPhase')
  //     }
  //   });
  //   return () => {
  //     authListener.unsubscribe;
  //   };
  // }, []);

  useEffect(() => {

    fetch('https://podcast-api.netlify.app/shows')
    
      .then((res) => res.json())
      .then((data) => {

        setPodcasts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // useEffect(() => {
  //   const session = supabase.auth.getSession()
  //   setUser(session?.user)

  //   console.log(session?.user)

  //   const unsubscribe = () => supabase.auth.onAuthStateChange((event, session) => {
  //     switch(event) {
  //       case 'loggedIn':
  //         setUser(session?.user)

  //         break;
  //         case 'loggedOut':
  //           setUser(null)
  //           break;
  //           default:
  //     }
      
  //   })
  //   return () => {
  //     unsubscribe()
  //   }
  // },[])

  const getEpisodesForSeason = (seasonNumber) => {
    return podcasts.filter((episode) => episode.season === seasonNumber);
  };

  const handlePodcastCardClick = (podcast) => {
    setSelectedPodcast(podcast)
  };
  const clearSelectedPodcast = () => {
    setSelectedPodcast(null);
  };
  const handleSearchChange =(event) => {
    setSearchQuery(event.target.value);
  };
  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    let sortedShows = [ ...podcasts];

      switch (criteria){
      case 'titleAZ':
    sortedShows.sort((a, b) => a.title.localeCompare(b.title));
    break ; 
      case 'titleZA':
    sortedShows.sort((a, b) => b.title.localeCompare(a.title));
    break ;
      case 'DateUpdatedAscending':
    sortedShows.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    break;  
      case 'DateUpdatedDescending':
    sortedShows.sort((a, b ) => new Date(b.updated) - new Date(a.updated));
    break;  
    default:
      break;
    }
    setPodcasts([sortedShows]);
    
  };


          
    
  // const login = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: 'github'
  //   })
  // }


  return (
    <>
      
     

   {/* { user? <> */}

      <Navbar
      searchQuery={searchQuery}
      handleSearchChange={handleSearchChange}
      sortBy={sortBy}
      handleSortChange={handleSortChange}
      />
      <Swiper  />
      <Sort  />
    
      {selectedPodcast && (
        <div className="podcast-container">
          <img className="podcast-container" src={selectedPodcast.image} alt={selectedPodcast.title} />
          <h2>Title:{selectedPodcast.title}</h2>
          <p>Id:{selectedPodcast.id}</p>
          <p>Updated:{selectedPodcast.updated}</p>
          <p>Season :{selectedPodcast.seasons}</p>
          <p>Description:{selectedPodcast.description}</p>

          <button onClick={clearSelectedPodcast}>Close</button>
        </div>
      )}

      {loading ? (
        <div className="loading-message">Loading...</div>
            ) :
           (<div className="podcast-container">

          <div className="season-selector">
            {/* Dropdown or buttons to select the season */}
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
            >
              <option value={null}>All Seasons</option>
              {/* Assuming seasons are numbered from 1 to N */}
              {Array.from({ length: 70 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  Season {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="podcast-list">

            {selectedSeason === null
              ? podcasts.map((podcast) => (
                <div
                  key={podcast.id}
                  className="podcast-card"
                  onClick={() => handlePodcastCardClick(podcast)}
                >
                  {podcast.image && (
                    <img src={podcast.image} alt={podcast.title} />
                  )}
                  <h2>{podcast.title}</h2>
                  {/* Render the audio player for each episode */}
                  
                </div>
              ))
              : getEpisodesForSeason(selectedSeason).sort((a, b) => a, title.localeCompare(b.title))
                .map((podcast) => (
                  <div key={podcast.id}
                    className="podcast-card"
                    onClick={() => handlePodcastCardClick(podcast)}
                  >
                    {podcast.image && (
                      <img src={podcast.image} alt={podcast.title} />
                    )}
                    <h2>{podcast.title}</h2>
                   
                  </div>
                ))}
          </div>
        </div>
      )}
    {/* </> : <button onClick={login}>login</button>}  */}


    </>

  )
}2

export default Main;



// export default function PodFiles() {
// const login = async () => {
//   await supabase.auth.signIn({
//     provider: "github"
//   });
// };

// useEffect(()=> {
//   const session = supabase.auth.session();
//   console.log(session)
// },[])
// }


//   return (
//     <div>

//       <button onClick={login}>Login with GITHUB</button>
//     </div>
//   )
// }
