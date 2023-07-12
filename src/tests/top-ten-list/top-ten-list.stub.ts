import { TopTenList } from "src/objects/top-ten-list/top-ten-list.schema";

export const TopTenListStub = (): TopTenList => {
  return {
    _id: "0",
    topTenMovies: ['1', '2', '3']
  };
};
