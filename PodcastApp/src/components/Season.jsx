// Handle favorite toggle - adding and removing podcasts from favorites
const favoriteToggleHandler = (podcastId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(podcastId)
        ? prevFavorites.filter((id) => id !== podcastId)
        : [...prevFavorites, podcastId]
    );

    setFilteredPodcasts((prevFilteredPodcasts) =>
      prevFilteredPodcasts.map((podcast) =>
        podcast.id === podcastId
          ? { ...podcast, isFavorite: !podcast.isFavorite }
          : podcast
      )
    );
  };

  // Show only favorite podcasts
  const handleShowFavoritesClick = () => {
    setShowFavorites(true);
  };

  // Show all podcasts
  const handleShowAllClick = () => {
    setShowFavorites(false);
  };

  //function to format date
  const formatDate = (isDate) => {
    const date = new Date(isDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Filter the podcasts based on the showFavorites state
  // const displayedPodcasts = showFavorites
  //   ? filteredPodcasts.filter((podcast) => favorites.includes(podcast.id))
  //   : filteredPodcasts;

  const favoritePodcasts = podcastData.filter((podcast) =>
  favorites.includes(podcast.id)
  );
  const displayedPodcasts = showFavorites ? favoritePodcasts : filteredPodcasts;

  // Store favorites in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("favoritePodcasts", JSON.stringify(favorites));
  }, [favorites]);

  const toggleView = () => {
    setShowFavorites((prev) => !prev)
  }
create favorite component
{showFavorites ? (
          <FavoritePodcast favoritePodcasts={favoritePodcasts} />
/eslint-disable/
import  { useState } from "react";
const FavoritePodcast = ({ favoritePodcasts }) => {
  const [sortOption, setSortOption] = useState("az");
  const handleSort = (option) => {
    setSortOption(option);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  let sortedFavorites = [...favoritePodcasts];
  switch (sortOption) {
    case "az":
      sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "asc":
      sortedFavorites.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
      break;
    case "desc":
      sortedFavorites.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
      break;
    default:
      break;
  }

  