import { SETPAGE } from "./types";

export const setPages = (page,count) => {
    return {
      type: SETPAGE,
      page: page,
      count:count
    };
  };