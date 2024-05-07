import { maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  const ratings = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
  });
  const lowestRating = minBy(
    ratings,
    (ratings) => ratings._avg.score as number
  );
  return lowestRating?.userId;
};

export const findTheNicestCriticId = async () => {
  const ratings = await prisma.starRating.groupBy({
    by: ["userId"],
    _avg: {
      score: true,
    },
  });

  const highestRating = maxBy(
    ratings,
    (ratings) => ratings._avg.score as number
  );
  return highestRating?.userId;
};
