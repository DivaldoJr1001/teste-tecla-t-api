interface Environment {
  port: number;
  tmdbAPI: {
    address: string,
    key?: string
  };
}

export const env: Environment = {
  port: 3000,
  tmdbAPI: {
    address: 'https://api.themoviedb.org/3/',
    key: 'b27589d0ded814385b6737fa84ebb1f1'
  }
};
