

const movieModule = require('../../models/movies');
async function getTopFavouriteMoviesAmongFriends(user) {
    const result =await movieModule.aggregate([
        {
            $match: { favorites: { $in: user.friends } }
        },
        {
            $unwind: '$favorites'
        },
        {
            $group: {
                _id: '$title',
                count: { $sum: { $cond: [{ $in: ['$favorites', user.friends] }, 1, 0] } }
            }
        },
        {
            $sort: { count: -1 }
        },
    ]);

    return result || [] ;
}
  

  function getTopTreeMoviesAndOrderThemAlphabetically(topMovies) {

    topMovies.sort((a, b) => {
        if (a.count !== b.count) {
          return -1;
        } else {
          return a._id.localeCompare(b._id);
        }
      });
      topMovies.reverse()
      const NewTopMoveis=topMovies.slice(0, 3);
     return NewTopMoveis
   
}



  
  
  module.exports = { getTopFavouriteMoviesAmongFriends ,getTopTreeMoviesAndOrderThemAlphabetically };
  
  

  