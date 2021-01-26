export const createViewModel = (model) => {
  let state = {};
  let resultsListener = null;
  let countListener = null;
  let errorListener = null;
  let searchesListener = null;
  let loadingListener = null;

  const update = (nextState) => {
    if (nextState.error) {
      console.error(nextState.error);
      return (
        loadingListener && loadingListener(nextState.loading),
        errorListener && errorListener(nextState.error)
      );
    }

    localStorage.setItem('tpLastState', JSON.stringify(nextState));
    resultsListener && resultsListener(nextState.results);
    countListener && countListener(nextState.count);
    searchesListener && searchesListener(nextState.searches);
    loadingListener && loadingListener(nextState.loading);

    state = nextState;
  };

  return {
    bindError: (listener) => (errorListener = listener),
    bindCount: (listener) => (countListener = listener),
    bindResults: (listener) => (resultsListener = listener),
    bindSearches: (listener) => (searchesListener = listener),
    bindLoading: (listener) => (loadingListener = listener),
    handleSearchSubmit: (searchTerm) => model.search(searchTerm),
    handleTagClick: (searchTerm) => model.search(searchTerm),
    handleTagRemove: (searchTerm) => model.removeTag(searchTerm),
    init: () => {
      update(model.getState());
      model.subscribe(update);
    },
  };
};
