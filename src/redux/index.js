import { createStore } from "redux";


// Actions
// ---------------------
export const RENDER_CONFETTI = "RENDER_CONFETTI";
export const USER_CREATED = "USER_CREATED";
export const USER_PROFILE = "USER_PROFILE";
export const TRANSLATIONS = "TRANSLATIONS";

export function renderConfetti(payload = null) {
  return { type: RENDER_CONFETTI, payload }
};

export function userCreated(payload = null) {
  return { type: USER_CREATED, payload }
};

export function userProfile(payload = null) {
  return { type: USER_PROFILE, payload }
};

export function translations(payload = null) {
  return { type: TRANSLATIONS, payload }
};

// Reducers
// ---------------------
const initialState = {
  articles: [],
  confetti: false,
  user: undefined,
  translations: undefined
};

export function rootReducer(state = initialState, action) {
  //console.log("rootReducer", action)
  if (action.type === RENDER_CONFETTI) {
    return Object.assign({}, state, {
      confetti: action.payload
    });
  }
  if (action.type === USER_CREATED) {
    return Object.assign({}, state, {
      user: action.payload.user,
      translations: action.payload.translations
    });
  }
  if (action.type === USER_PROFILE) {
    return Object.assign({}, state, {
      user: action.payload
    });
  }
  if (action.type === TRANSLATIONS) {
    return Object.assign({}, state, {
      translations: action.payload
    });
  }
  return state;
}

export const store = createStore(rootReducer);
export default store