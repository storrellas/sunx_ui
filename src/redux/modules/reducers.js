//import { ADD_ARTICLE } from "./action-types";


// Actions
// ---------------------
export const ADD_ARTICLE = "ADD_ARTICLE";
export const ENABLE_CONFETTI = "ENABLED_CONFETTI";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};


// Reducers
// ---------------------
const initialState = {
  articles: []
};

export function rootReducer(state = initialState, action) {
  console.log("rootReducer", action)
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  return state;
}

