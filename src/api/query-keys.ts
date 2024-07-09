const QUERY_KEYS = {
  // pokemon query keys
  GET_ALL_POKEMON_CARDS: ["pokemon-cards"],
  GET_POKEMON_CARD_BY_ID: (id: number) => ["pokemon-card", { id }],

  // yu-gi-oh query keys
  GET_ALL_YU_GI_OH_CARDS: ["yu-gi-oh-cards"],
  GET_YU_GI_OH_CARD_BY_ID: (id: number) => ["yu-gi-oh-card", { id }],

  // dragon ball z query keys
  GET_ALL_DRAGON_BALL_Z_CARDS: ["dragon-ball-z-cards"],
  GET_DRAGON_BALL_Z_CARD_BY_ID: (id: number) => ["dragon-ball-z-card", { id }],
}

export default QUERY_KEYS
