export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'init':
      return action.payload;
    case 'update':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
