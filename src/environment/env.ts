interface Environment {
  port: number;
  tmdbAPI: {
    address: string,
    key: string
  };
  jwtKey: string;
}

export const env: Environment = {
  port: 3000,
  tmdbAPI: {
    address: 'https://api.themoviedb.org/3/',
    key: 'b27589d0ded814385b6737fa84ebb1f1'
  },
  jwtKey: 'ikorfdhgwe823e2937f7r3i3w82egdsd83e7dqwhrhdf'
};
