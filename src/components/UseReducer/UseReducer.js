import React, { useReducer } from 'react';
import { Loading } from '../Loading';

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};

// Action Types
const actionTypes = {
  CONFIRM: 'CONFIRM',
  WRITE: 'WRITE',
  ERROR: 'ERROR',
  CHECK: 'CHECK',
  DELETE: 'DELETE',
  RESET: 'RESET'
};

// DECLARATIVE
const reducerObject = (state, payload) => ({
  [actionTypes.CONFIRM]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  [actionTypes.WRITE]: {
    ...state,
    value: payload
  },
  [actionTypes.ERROR]: {
    ...state,
    error: true,
    loading: false
  },
  [actionTypes.CHECK]: {
    ...state,
    error: false,
    loading: true
  },
  [actionTypes.DELETE]: {
    ...state,
    deleted: true,
    value: ''
  },
  [actionTypes.RESET]: {
    ...state,
    deleted: false,
    confirmed: false,
    value: ''
  }
});

const reducer = (state, action) => reducerObject(state, action.payload)[action.type] || state;

const SECURITY_CODE = '666LOL';

function UseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Action Creators
  const onConfirm = () => dispatch({ type: actionTypes.CONFIRM });
  const onCheck = () => dispatch({ type: actionTypes.CHECK });
  const onDelete = () => dispatch({ type: actionTypes.DELETE });
  const onReset = () => dispatch({ type: actionTypes.RESET });
  const onError = () => dispatch({ type: actionTypes.ERROR });
  const onWrite = ({ target: { value } }) => {
    dispatch({ type: actionTypes.WRITE, payload: value });
  };

  React.useEffect(() => {
    if (state.loading) {
      setTimeout(() => {
        if (state.value !== SECURITY_CODE) {
          onError();
        } else {
          onConfirm();
        }
      }, 2000);
    }
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Remove UseReducer</h2>
        <p>Please, type the security code</p>

        {state.error && <p>Error. Incorrect code</p>}
        {state.loading && <Loading />}

        <input value={state.value} onChange={onWrite} placeholder="Security Code" />
        <button onClick={onCheck}>Check</button>
      </div>
    );
  }
  return state.confirmed && !state.deleted ? (
    <div>
      <p>Are you sure?.</p>
      <div>
        <button onClick={onDelete}>Yes, delete.</button>
        <button onClick={onReset}>No.</button>
      </div>
    </div>
  ) : (
    <div>
      <p>Deleted successfully.</p>
      <div>
        <button onClick={onReset}>Reset.</button>
      </div>
    </div>
  );
}

export { UseReducer };
