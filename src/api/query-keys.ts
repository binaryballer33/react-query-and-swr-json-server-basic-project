const QUERY_KEYS = {
    // pokemon query keys
    ALL_POKEMON_CARDS: ["pokemon-cards"],
    ALL_POKEMON_CARDS_PAGINATED: (limit: number, page: number) => ["pokemon-cards", { limit }, { page }],
    POKEMON_CARD_BY_ID: (id: number) => ["pokemon-cards", { id }],

    // yu-gi-oh query keys
    ALL_YU_GI_OH_CARDS: ["yu-gi-oh-cards"],
    YU_GI_OH_CARD_BY_ID: (id: number) => ["yu-gi-oh-cards", { id }],

    // dragon ball z query keys
    ALL_DRAGON_BALL_Z_CARDS: ["dragon-ball-z-cards"],
    DRAGON_BALL_Z_CARD_BY_ID: (id: number) => ["dragon-ball-z-cards", { id }],
}

export default QUERY_KEYS
