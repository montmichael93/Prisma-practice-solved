import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = async () => {
  const moviesObtained = await prisma.movie.findMany({
    where: {
      parentalRating: {
        equals: "PG-13",
      },
    },
    orderBy: {
      releaseYear: "desc",
    },
    select: {
      parentalRating: true,
      releaseYear: true,
    },
  });
  return moviesObtained;
};
