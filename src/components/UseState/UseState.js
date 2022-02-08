import React, { useState } from 'react';
import { Loading } from '../Loading';

const SECURITY_CODE = '666LOL';

function UseState() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        if (value !== SECURITY_CODE) {
          setError(true);
        }
        setLoading(false);
      }, 2000);
    }
  }, [loading]);

  return (
    <div>
      <h2>Remove UseState</h2>
      <p>Please, type the security code</p>

      {error && <p>Error. Incorrect code</p>}
      {loading && <Loading />}

      <input
        value={value}
        onChange={(event) => {
          const {
            target: { value }
          } = event;
          setValue(value);
        }}
        placeholder="Security Code"
      />
      <button
        onClick={() => {
          setError(false);
          setLoading(true);
        }}>
        Check
      </button>
    </div>
  );
}

export { UseState };
