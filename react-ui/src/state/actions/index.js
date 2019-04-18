import createActions from './createActions';

import notelist from '../reducers/notelist';

export const notes = createActions(notelist.reducers);
