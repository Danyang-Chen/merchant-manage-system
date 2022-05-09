const Model = {
  namespace: 'category',

  state: {
    categoryList: [],
  },

  effects: {},

  reducers: {
    saveCategoryList(state, action) {
      return {
        ...state,
        categoryList: action.payload || [],
      };
    },
  },
};

export default Model;

// store.category -> { categoryList: [] }
// store.category.categoryList -> []

// { type: 'category/saveCategoryList' } -> a
// { type: 'category/saveCategoryList', payload: [] }
// dispatch({ type: 'category/saveCategoryList' })
