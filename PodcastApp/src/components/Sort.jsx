
import React from 'react';
const SortBy = (props) => {
  // const handleSortChange = (event) => {
  //    onSort(event.target.value);
  // };
  return (
    <div className="sort-by">
      <span className='text-color'>Sort by: </span>
      <select onChange={props.onSort}>
        <option className='option-box' value="" >
          Select an option
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        <option value="updatedAsc">Date Updated (Ascending)</option>
        <option value="updatedDesc">Date Updated (Descending)</option>
      </select>
    </div>
  );
};
export default SortBy;




// import { useState } from 'react';

// const genreTitleMapping = {
//   1: 'Personal Growth',
//   2: 'True Crime and Investigative Journalism',
//   3: 'History',
//   4: 'Comedy',
//   5: 'Entertainment',
//   6: 'Business',
//   7: 'Fiction',
//   8: 'News',
//   9: 'Kids and Family',
// };

// const SearchSort = ({ searchQuery, handleSearchChange, sortBy, handleSortChange }) => {
//   const [sortState, setSortState] = useState(sortBy);

//   const sortShows = (criteria) => {
//     setSortState(criteria);
//     handleSortChange(criteria);
//   };

//   const compareTitles = (a, b) => {
//     const titleA = a.title.toUpperCase();
//     const titleB = b.title.toUpperCase();

//     if (sortState === 'titleAZ') {
//       return titleA.localeCompare(titleB);
//     } else if (sortState === 'titleZA') {
//       return titleB.localeCompare(titleA);
//     }

//     return 0;
//   };

//   const compareDates = (a, b) => {
//     const dateA = new Date(a.dateUpdated);
//     const dateB = new Date(b.dateUpdated);

//     if (sortState === 'dateUpdatedAscending') {
//       return dateA - dateB;
//     } else if (sortState === 'dateUpdatedDescending') {
//       return dateB - dateA;
//     }

//     return 0;
//   };

//   const compareGenres = (a, b) => {
//     const genreA = genreTitleMapping[a.genre];
//     const genreB = genreTitleMapping[b.genre];

//     return genreA.localeCompare(genreB);
//   };

//   const sortFunction = (a, b) => {
//     if (sortState.startsWith('title')) {
//       return compareTitles(a, b);
//     } else if (sortState.startsWith('date')) {
//       return compareDates(a, b);
//     } else if (sortState === 'genre') {
//       return compareGenres(a, b);
//     }

//     return 0;
//   };

//   return (
//     <div className="search-sort-container">
//       <input type="text" placeholder="Search shows" value={searchQuery} onChange={handleSearchChange} />
//       <select value={sortBy} onChange={(e) => sortShows(e.target.value)}>
//         <option value="default">Select an option</option>
//         <option value="titleAZ">Title A-Z</option>
//         <option value="titleZA">Title Z-A</option>
//         <option value="dateUpdatedAscending">Date Updated (Ascending)</option>
//         <option value="dateUpdatedDescending">Date Updated (Descending)</option>
//         <option value="genre">Genre</option>
//       </select>
//     </div>
//   );
// };

// export default SearchSort;






