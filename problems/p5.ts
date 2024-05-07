import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const ratingList = await prisma.starRating.groupBy({
    by: ["movieId"],
    _avg: {
      score: true,
    },
  });

  const filteredRatingList = ratingList.filter(
    (rating) => rating._avg.score && rating._avg.score > n && rating.movieId
  );

  const filmList = await Promise.all(
    filteredRatingList.map(async (listing) => {
      return await prisma.movie.findUnique({
        where: {
          id: listing.movieId,
        },
      });
    })
  );

  return filmList;
};
