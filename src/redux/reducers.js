import { UPDATE_GENERATED_COPY, SAVE_COPY, EXPORT_COPY } from './actions';

const initialState = {
  generatedCopy: null,
  savedCopies: [],
};

const copyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GENERATED_COPY:
      return {
        ...state,
        generatedCopy: action.payload,
      };

    case SAVE_COPY:
      return {
        ...state,
        savedCopies: [...state.savedCopies, state.generatedCopy],
      };

    case EXPORT_COPY:
      return state;

    default:
      return state;
  }
};

export default copyReducer;
