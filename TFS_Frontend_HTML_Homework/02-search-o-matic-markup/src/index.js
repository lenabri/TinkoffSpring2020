// App
import { createModel } from './app/createModel.js';
import { createViewModel } from './app/createViewModel.js';
import { createView } from './app/createView.js';

// Components
import './components/currentYear.js';
import './components/movieCard.js';
localStorage.lastState1 = JSON.stringify(  {
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
    cashedResults: new Map(),
  } );
const model = createModel();
const view = createView();
const viewModel = createViewModel(model);

// ViewModel -> View
viewModel.bindCount(view.renderCount);
viewModel.bindError(view.renderError);
viewModel.bindResults(view.renderList);
viewModel.bindSearches(view.renderSearchList);
viewModel.bindLoading(view.renderSpinner);

// View -> ViewModel
view.onSearchSubmit(viewModel.handleSearchSubmit);
view.onTagClick(viewModel.handleTagClick);
view.onTagRemove(viewModel.handleTagRemove);

// Init app
viewModel.init();

model.subscribe(console.log);
