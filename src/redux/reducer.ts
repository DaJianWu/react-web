export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
