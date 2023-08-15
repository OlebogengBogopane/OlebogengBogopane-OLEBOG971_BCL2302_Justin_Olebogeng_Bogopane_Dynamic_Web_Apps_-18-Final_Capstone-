// // PodcastDataFetcher.js
// import React, { useEffect, useState } from 'react';
// import Season from '../PlayerComponent.jsx';
// import { supabase } from './SupaBase.jsx';
// import { Favorite } from '@mui/icons-material';
// const PodcastDataFetcher = () => {
//   const [podcastData, setPodcastData] = useState([]);

//   useEffect(() => {
//     fetch('https://podcast-api.netlify.app/id')
//       .then((response) => response.json())
//       .then((data) => setPodcastData(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   });

//   return (
//     <div className='EpiStyles'>

//       <Season 
//         Id = {seasonAPIData}/>
//       {/* Render your main app component or pass the fetched data as props to it */}
//       {/* You can also map through the podcastData array and render individual components */}
//       {/* For demonstration purposes, we'll just render the fetched data here */}
//       {podcastData.map((podcast) => (
//         <div key={podcast.id}>
//           <h2>Title: {podcast.title}</h2>
//           <button className='Fav'

//             onClick={() => {
//               const Faves = async () => {
//                 const  {data, error} = await supabase
//                   .from(' favourites')
//                   .insert({
//                     title : podcast.title 
//                   })
//               } 
              

//               Faves()
//             }}    
          
//           > Favourites </button>
//           <p>ID: {podcast.id}</p>
//           <p>Season: {podcast.season}</p>
//           <img src={podcast.image} alt={podcast.title} />
//           <p>Episode: {podcast.episode}</p>
//           <audio controls>
//             <source src={podcast.audio} type="audio/mpeg" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PodcastDataFetcher;