import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {
  const listing = await prisma.starRating.aggregate({
    where: {
      userId: userId,
    },
    _avg: {
      score: true,
    },
  });

  return listing._avg.score;
};
