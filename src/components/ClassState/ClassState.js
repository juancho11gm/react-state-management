import React from 'react';
import { Loading } from '../Loading';

const SECURITY_CODE = '666LOL';

class ClassState extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      loading: false,
      error: false
    };
  }

  componentDidUpdate() {
    if (this.state.loading) {
      setTimeout(() => {
        if (this.state.value !== SECURITY_CODE) {
          this.setState({
            error: true
          });
        }
        this.setState({
          loading: false
        });
      }, 2000);
    }
  }

  render() {
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Remove ClassState</h2>
        <p>Please, type the security code</p>

        {error && <p>Error. Incorrect code</p>}
        {loading && <Loading />}

        <input
          value={value}
          onChange={(event) => this.setState({ value: event.target.value })}
          placeholder="Security Code"
        />
        <button onClick={() => this.setState({ loading: true, error: false })}>Check</button>
      </div>
    );
  }
}

export { ClassState };
