import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  const ratingsGivenToTheMoviesThatTheUsersHadWatched =
    await prisma.starRating.findMany({
      where: {
        userId: userId,
      },
    });

  return prisma.movie.findMany({
    where: {
      id: {
        in: ratingsGivenToTheMoviesThatTheUsersHadWatched.map(
          (movie) => movie.movieId
        ),
      },
    },
  });
};
