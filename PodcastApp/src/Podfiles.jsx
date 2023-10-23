/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Fragment } from 'react';
import "./App.css";
import './index.css'
import Navbar from './Navbar'
 import SortBy from './components/Sort'
import { supabase } from './components/SupaBase';
import Log from './components/Login'
import Carousel from './components/Swiper';
import Seasons from './components/Season';




function Main () {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null)
  const [sortBy,setSortBy] = useState('default')
  const[searchQuery, setSearchQuery] = useState('')
  const [throwSignUp, setThrowSignUp] = useState('signUpPhase')
  const [user, setUser] = useState(null)
  const [randomMovie, setRandomMovie] = useState(null);

    
      useEffect(() => {
        const intervalId = setInterval(() => {
          renderRandomMovie();
        }, 6000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, [randomMovie]);
    
      const renderRandomMovie = () => {
        const randomIndex = Math.floor(Math.random() * podcasts.length);
        const selectedMovie = podcasts[randomIndex];
        setRandomMovie(selectedMovie);
      };

  
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

    const [ titlestore, settitlestore] = useState(null)
    const [ showsStore, setShowstore] = useState(null)

    useEffect(() => {
      settitlestore(podcasts.map((item) => item.title))
      setShowstore(podcasts.map((item) => item))
    }, [])
 

  useEffect(() => {
    const session = supabase.auth.getSession()
    setUser(session?.user)

    console.log(session?.user)

    const unsubscribe = () => supabase.auth.onAuthStateChange((event, session) => {
      switch(event) {
        case 'SIGNED_IN':
          setUser(session?.user)

          break;
          case 'SIGNED_OUT':
            setUser(null)
            break;
            default:
      }
      
    })
    return () => {
      unsubscribe()
    }
  },[])

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


  const handleSort = (event) => {
    const option = event.target.value
    switch (option) {
      case 'asc':
        const sortedDataAZ = podcasts.sort((a, b) => a.title.localeCompare(b.title));
        setPodcasts(sortedDataAZ);
        break;
      case 'desc':
        const sortedDataZA = podcasts.sort((a, b) => b.title.localeCompare(a.title));
        setPodcasts(sortedDataZA);
        break;
      case 'updatedAsc':
        const sortedDataUpdatedAsc = podcasts.sort((a, b) => a.updated.localeCompare(b.updated));
        setPodcasts(sortedDataUpdatedAsc);
        break;
      case 'updatedDesc':
        const sortedDataUpdatedDesc = podcasts.sort((a, b) => b.updated.localeCompare(a.updated));
        setPodcasts(sortedDataUpdatedDesc);
        break;
      default:
        break;
    }
  };

          
  const [APIstore,setAPIStore] = useState (null)

  function seasonAPI (id) {
    setAPIStore(id)
  }

  const [fetchError,setfetchError]= useState(null)
  const [favouritesState,setFavouritesState]= useState(null)
  const [favsRender , setFavsRender]= useState(null)
  const [showFavs , setShowFavs]= useState(false)

  useEffect(() => {
    const fetchDAta = async () => {
      try{
        const { data , error } = await supabase
        .from('favourites')
        .select()

        if(error) {
          setfetchError(error)
          setFavouritesState(null)

        } else {
          setfetchError(null)
          setFavouritesState(data)
        }

        } catch (error) {
          console.log(error)
        }

      }

  
      fetchDAta()
    },[])


    useEffect(() => {

      favs()
      console.log(favouritesState)
    }, [favouritesState])

function favs(){
  if(favouritesState){
    const m = favouritesState.map((item) => {
      return(
        <>     
          <h1 style={{color: 'rgba(31, 226, 161, 0.57)'}}>{item.title}</h1>
          <audio controls>
            <source src={item.audio} type="audio/mpeg" />
          </audio>
        </>
      )
    })

    setFavsRender(m)
  }
}



  return (
    <>
     
    <Navbar  />
    <Carousel/>

   { user? <>

      <Seasons
      Id={APIstore}
      />
     
    
      {selectedPodcast && (
        <Fragment>
          
        <div className="podcast-container" onClick={() => seasonAPI(selectedPodcast.id)}>
        
          <img className="podcast-container" src={selectedPodcast.image} alt={selectedPodcast.title }   />
          <h2>Title:{selectedPodcast.title}</h2>
          {/* <p>Id:{selectedPodcast.id}</p> */}
          <p>Updated:{ ''}{ new Date(selectedPodcast.updated).toLocaleDateString('en-US',{
            year: 'numeric', month: "long", day: 'numeric'
          })}</p>

          <p>Season :{selectedPodcast.seasons}</p>
          <p>Description:{selectedPodcast.description}</p>

        <p>Hello World</p>
        
          <button onClick={clearSelectedPodcast}>Close</button>
        </div>
        </Fragment>
      )}



      {loading ? (
        <div className="loading-message">Loading...</div>
            ) :
           (<div className="podcast-container">
               {randomMovie &&  <div>

                <div className="HeroDetails">
                      <h1>Podcasts you may like</h1>
                           <h2 className="title">{randomMovie.title}</h2>
                           <h3 className="seasons"> Seasons: {randomMovie.seasons}</h3>
                           {/* <p> Genre :{randomMovie.genre}</p> */}
                           {/* <p className="">{randomMovie.description}</p> */}
                       </div>
               

              </div>}

            
              <SortBy
          
      onSort={handleSort}
    
      />


              <button onClick={() => setShowFavs(!showFavs)}>Favourites</button>
                {showFavs ? favsRender : ' '}
         

          <div className="podcast-list">

            {selectedSeason === null
              ?  podcasts.map((podcast) => (
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
                    onClick={() => {handlePodcastCardClick(podcast)}}
                  >
                    {podcast.image && (
                      <img src={podcast.image} alt={podcast.title} />
                    )}
                    <h2>{podcast.title}</h2>
                   
                  </div>
                ))}
          </div>
        </div>
      )}</>
    : ' '} 


    </>
  

  )
}

 export default Main;




