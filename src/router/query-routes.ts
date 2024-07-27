const QUERY_ROUTES = {
  BACKEND_BASE_URL: "http://localhost:3333",

  // Yu-Gi-Oh Routes
  CREATE_YUGIOH_CARD: "/yu-gi-oh/create-card",
  GET_ALL_YUGIOH_CARDS: "/yu-gi-oh",
  GET_YUGIOH_CARD_BY_ID: (id: number) => `/yu-gi-oh/${id}`,
  UPDATE_YUGIOH_CARD_BY_ID: (id: number) => `/yu-gi-oh/update-card/${id}`,
  DELETE_YUGIOH_CARD_BY_ID: (id: number) => `/yu-gi-oh/delete-card/${id}`,

  // Pokemon Routes
  CREATE_POKEMON_CARD: "/pokemon/create-card",
  GET_ALL_POKEMON_CARDS: "/pokemon",
  GET_ALL_POKEMON_CARDS_PAGINATED: (limit: number, page: number) => `/pokemon?_limit=${limit}&_page=${page}`,
  GET_POKEMON_CARD_BY_ID: (id: number) => `/pokemon/${id}`,
  UPDATE_POKEMON_CARD_BY_ID: (id: number) => `/pokemon/update-card/${id}`,
  DELETE_POKEMON_CARD_BY_ID: (id: number) => `/pokemon/delete-card/${id}`,

  // Dragon Ball Z Routes
  CREATE_DRAGON_BALL_Z_CARD: "/dragon-ball-z/create-card",
  GET_ALL_DRAGON_BALL_Z_CARDS: "/dragon-ball-z",
  GET_DRAGON_BALL_Z_CARD_BY_ID: (id: number) => `/dragon-ball-z/${id}`,
  UPDATE_DRAGON_BALL_Z_CARD: (id: number) => `/dragon-ball-z/update-card/${id}`,
  DELETE_DRAGON_BALL_Z_CARD: (id: number) => `/dragon-ball-z/delete-card/${id}`,
}

export default QUERY_ROUTES
