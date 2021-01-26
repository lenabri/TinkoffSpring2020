import { createStore } from '../helpers/createStore.js';
import { mapMovie } from '../helpers/mapMovie.js';

export const createModel = () =>
  createStore(
    localStorage.getItem('tpLastState') !== null
      ? JSON.parse(localStorage.getItem('tpLastState'))
      : {
          count: 0,
          results: [],
          error: false,
          loading: false,
          searches: [
            'Star Wars',
            'Kung Fury',
            'Back to the Future',
            'Matrix',
            'Terminator',
          ],
          cashedResults: [[]],
        },
    (store) => ({
      search: async (currentState, searchTerm) => {
        const controller = new AbortController();
        const signal = controller.signal;

        if (currentState.loading) {
          controller.abort();
        }

        store.setState({
          count: 0,
          results: [],
          error: false,
          loading: true,
          searches: [searchTerm].concat(
            currentState.searches.filter((term) => term !== searchTerm)
          ),
        });

        const cashResults = new Map(currentState.cashedResults);
        console.log('test', cashResults);

        if (cashResults.has(searchTerm.toLowerCase())) {
          return cashResults.get(searchTerm.toLowerCase());
        }

        try {
          const apikey = 'd7b504e';

          const data = await fetch(
            `http://www.omdbapi.com/?type=movie&apikey=${apikey}&s=${searchTerm}`,
            { signal }
          ).then((r) => r.json());

          if (data.Response === 'True') {
            const url = `http://www.omdbapi.com/?type=movie&apikey=${apikey}&t=`;
            const filmNames = data.Search.map((film) => url + film.Title);

            let dataExtra = await Promise.all(
              filmNames.map((el) => fetch(el))
            ).then((responses) => Promise.all(responses.map((r) => r.json())));

            let tmpState = [...currentState.cashedResults];
            tmpState.push([
              searchTerm.toLowerCase(),
              {
                count: data.totalResults,
                results: dataExtra.map(mapMovie),
                loading: false,
              },
            ]);

            store.setState({
              cashedResults: tmpState,
            });

            return {
              count: data.totalResults,
              results: dataExtra.map(mapMovie),
              loading: false,
            };
          } 
          return { error: data.Error, loading: false };
          
        } catch (error) {
          return { error: error, loading: false };
        }
      },
      removeTag: (currentState, searchTerm) => {
        return {
          searches: currentState.searches.filter((term) => term !== searchTerm),
        };
      },
    })
  );
