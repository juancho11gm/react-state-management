import React, { useState } from 'react';
import { Loading } from '../Loading';

const SECURITY_CODE = '666LOL';

function UseState() {
  const [state, setState] = useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  });

  const onConfirm = () => {
    setState({
      ...state,
      loading: false,
      error: false,
      confirmed: true
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      error: false,
      loading: true
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
      value: ''
    });
  };

  const onReset = () => {
    setState({
      ...state,
      deleted: false,
      confirmed: false,
      value: ''
    });
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
        <h2>Remove UseState</h2>
        <p>Please, type the security code</p>

        {state.error && <p>Error. Incorrect code</p>}
        {state.loading && <Loading />}

        <input
          value={state.value}
          onChange={(event) => onWrite(event.target.value)}
          placeholder="Security Code"
        />
        <button onClick={() => onCheck()}>Check</button>
      </div>
    );
  }
  return state.confirmed && !state.deleted ? (
    <div>
      <p>Are you sure?.</p>
      <div>
        <button onClick={() => onDelete()}>Yes, delete.</button>
        <button onClick={() => onReset()}>No.</button>
      </div>
    </div>
  ) : (
    <div>
      <p>Deleted successfully.</p>
      <div>
        <button onClick={() => onReset()}>Reset.</button>
      </div>
    </div>
  );
}

export { UseState };
