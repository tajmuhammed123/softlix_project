export const UPDATE_GENERATED_COPY = 'UPDATE_GENERATED_COPY';
export const SAVE_COPY = 'SAVE_COPY';
export const EXPORT_COPY = 'EXPORT_COPY';

export const updateGeneratedCopy = (copy) => ({
  type: UPDATE_GENERATED_COPY,
  payload: copy,
});

export const saveCopy = () => ({
  type: SAVE_COPY,
});

export const exportCopy = () => ({
  type: EXPORT_COPY,
});
