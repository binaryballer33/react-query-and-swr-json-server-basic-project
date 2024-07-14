const QUERY_ROUTES = {
  BACKEND_BASE_URL: "http://localhost:3333",
  CREATE_YUGIOH_CARD: "/yu-gi-oh/create-card",
  GET_ALL_YUGIOH_CARDS: "/yu-gi-oh",
  GET_YUGIOH_CARD_BY_ID: (id: number) => `/yu-gi-oh/${id}`,
  CREATE_POKEMON_CARD: "/pokemon/create-card",
  GET_ALL_POKEMON_CARDS: "/pokemon",
  GET_POKEMON_CARD_BY_ID: (id: number) => `/pokemon/${id}`,
  CREATE_DRAGON_BALL_Z_CARD: "/dragon-ball-z/create-card",
  GET_ALL_DRAGON_BALL_Z_CARDS: "/dragon-ball-z",
  GET_DRAGON_BALL_Z_CARD_BY_ID: (id: number) => `/dragon-ball-z/${id}`,
}

export default QUERY_ROUTES
