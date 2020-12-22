export default {
  addQuery: (query) => ({
    type: 'ADD_SEARCH_QUERY',
    payload: (() => query)(),
  }),
  clearQuery: () => ({
    type: 'CLEAR_QUERY',
  }),
};
