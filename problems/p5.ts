import { prisma } from "./prisma";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  const ratingList = await prisma.starRating.groupBy({
    by: ["movieId"],
    having: {
      score: {
        _avg: {
          gt: n,
        },
      },
    },
  });

  return prisma.movie.findMany({
    where: {
      id: {
        in: ratingList.map((rating) => rating.movieId),
      },
    },
  });
};
