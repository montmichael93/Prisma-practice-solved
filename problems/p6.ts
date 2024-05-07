import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const userRatingsList = await prisma.starRating.findMany({
    where: {
      userId: userId,
    },
  });
  const filmList = await Promise.all(
    userRatingsList.map(async (rating) => {
      const movie = await prisma.movie.findUnique({
        where: {
          id: rating.movieId,
        },
        select: {
          id: true,
          parentalRating: true,
          releaseYear: true,
          title: true,
        },
      });
      return movie;
    })
  );

  return filmList;
};
