export const init = (payload: any) => {
  return {
    type: 'init',
    payload,
  };
};

export const update = (payload: any) => {
  return {
    type: 'update',
    payload,
  };
};
