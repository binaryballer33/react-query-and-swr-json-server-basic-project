const QUERY_KEYS = {
  // pokemon query keys
  ALL_POKEMON_CARDS: ["pokemon-cards"],
  POKEMON_CARD_BY_ID: (id: number) => ["pokemon-card", { id }],

  // yu-gi-oh query keys
  ALL_YU_GI_OH_CARDS: ["yu-gi-oh-cards"],
  YU_GI_OH_CARD_BY_ID: (id: number) => ["yu-gi-oh-card", { id }],

  // dragon ball z query keys
  ALL_DRAGON_BALL_Z_CARDS: ["dragon-ball-z-cards"],
  DRAGON_BALL_Z_CARD_BY_ID: (id: number) => ["dragon-ball-z-card", { id }],
}

export default QUERY_KEYS
