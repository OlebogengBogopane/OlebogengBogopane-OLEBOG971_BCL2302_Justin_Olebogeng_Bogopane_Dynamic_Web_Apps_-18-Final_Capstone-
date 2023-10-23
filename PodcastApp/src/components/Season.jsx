// // Handle favorite toggle - adding and removing podcasts from favorites
// const favoriteToggleHandler = (podcastId) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.includes(podcastId)
//         ? prevFavorites.filter((id) => id !== podcastId)
//         : [...prevFavorites, podcastId]
//     );

//import { useEffect, useState } from "react";

//     setFilteredPodcasts((prevFilteredPodcasts) =>
//       prevFilteredPodcasts.map((podcast) =>
//         podcast.id === podcastId
//           ? { ...podcast, isFavorite: !podcast.isFavorite }
//           : podcast
//       )
//     );
//   };

//   // Show only favorite podcasts
//   const handleShowFavoritesClick = () => {
//     setShowFavorites(true);
//   };

//   // Show all podcasts
//   const handleShowAllClick = () => {
//     setShowFavorites(false);
//   };

//   //function to format date
//   const formatDate = (isDate) => {
//     const date = new Date(isDate);
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   // Filter the podcasts based on the showFavorites state
//   // const displayedPodcasts = showFavorites
//   //   ? filteredPodcasts.filter((podcast) => favorites.includes(podcast.id))
//   //   : filteredPodcasts;

//   const favoritePodcasts = podcastData.filter((podcast) =>
//   favorites.includes(podcast.id)
//   );
//   const displayedPodcasts = showFavorites ? favoritePodcasts : filteredPodcasts;

//   // Store favorites in local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("favoritePodcasts", JSON.stringify(favorites));
//   }, [favorites]);

//   const toggleView = () => {
//     setShowFavorites((prev) => !prev)
//   }
// create favorite component
// {showFavorites ? (
//           <FavoritePodcast favoritePodcasts={favoritePodcasts} />
// /eslint-disable/
// import  { useState } from "react";
// const FavoritePodcast = ({ favoritePodcasts }) => {
//   const [sortOption, setSortOption] = useState("az");
//   const handleSort = (option) => {
//     setSortOption(option);
//   };
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };
//   let sortedFavorites = [...favoritePodcasts];
//   switch (sortOption) {
//     case "az":
//       sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
//       break;
//     case "za":
//       sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
//       break;
//     case "asc":
//       sortedFavorites.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
//       break;
//     case "desc":
//       sortedFavorites.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
//       break;
//     default:
//       break;
//   }

//   export default function Seasons (props) {
//   const [seasonsData, setSeasonsData ] = useState (null) 

//     useEffect(()=>{
//       if( props.Id) {
//         fetch(`https://podcast-api.netlify.app/id/${props.Id}`)
//         .then ((response)=> response.json())
//         .then(data => {
//           const seasonMap = data.seasons.map((items ) => {
//           return (

//           <div className="pop">
//             <div className="gops" onClick={() => {
//               episode(items.episodes)
//             }}>

//             <h1>
//               {"Season"}  { items.season}
//             </h1>
//             <img src={items.image} className="season-image"></img>
//             </div>
//             </div>
//           )
  
//         })
//          setSeasonsData(seasonMap) 
//         })

      
//       }
//     },[props.Id])
// const [episodesData, setEpisodesData] = useState (null)

//     function episode(getEpisodes) {
//       if (getEpisodes) {
//         const episodemap = getEpisodes.map((item) => {
//           return (
//             <div className='seo'>
//               <h1>
//               {item.title}
//               </h1>
//               <p>Description {item.description}</p>
//               <p>{item.episode}</p>
//                <audio controls autoPlay >
//                 <source src={item.file} />
//                </audio>
//             </div>
//           )
//         } )
//         setEpisodesData(episodemap);
//       }
//     }

//     return (
//       <div>
//         {episodesData}
//         {seasonsData}
//       </div>
//     )
//   }

  
import React, { useEffect, useState } from 'react';
import { supabase } from './SupaBase';

export default function Seasons(props) {
  const [seasonsData, setSeasonsData] = useState(null);
  const [episodesData, setEpisodesData] = useState(null);

  useEffect(() => {
    if (props.Id) {
      fetch(`https://podcast-api.netlify.app/id/${props.Id}`)
        .then((response) => response.json())
        .then((data) => {
          const seasonMap = data.seasons.map((items) => (
            <div className="pop">
              <div className="gops" onClick={() => episode(items)}>
                <h1>{"Season"} {items.season}</h1>
                <img src={items.image} className="season-image" alt={`Season ${items.season}`} />
              </div>
            </div>
          ));
          setSeasonsData(seasonMap);
        });
    }
  }, [props.Id]);    

  function episode(getEpisodes) {
    if (getEpisodes) {
      const episodeMap = getEpisodes.episodes.map((item) => (
        <div className="seo">
          <h1>{item.title}</h1>
          <p>Description: {item.description}</p>
          <p>Episode: {item.episode}</p>
          <button className='Fav'
          

onClick={() => {
  const Faves = async () => {
    const  {data, error} = await supabase
      .from('favourites')
      .insert({
        title : item.title,
        show:  getEpisodes.title,
        image: getEpisodes.image,
        audio: item.file
      
      })
  } 

  Faves()
}}    

> Favourites </button>
          <audio controls>
            <source src={item.file} />
          </audio>
        </div>
      ));
      setEpisodesData(episodeMap);
    }
  }

  return (
    <div className="season-container">
      
      <div className="seasons">{seasonsData}</div>
      <div className="episodes">{episodesData}</div>
    </div>
  );
}

