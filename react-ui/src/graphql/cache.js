import React, {Component} from 'react';
import {withApollo} from "react-apollo";

const testWrappedComponent = (WrappedComponent) => {
  const component = class CacheComponent extends Component {
    refetchQueries = (names) => {
      const {client} = this.props;
      const {queryManager} = client;

      names
        .map(name => queryManager.queryIdsByName[name])
        .filter(x => x !== undefined)
        .forEach(id => {
          if (queryManager.queries.has(id[0])) {
            queryManager.queries.get(id[0]).observableQuery.refetch()
          }
        });
    }

    writeFragment = ({id, fragment, data}) => {
      const {client} = this.props;

      const __typename = fragment.definitions[0].typeCondition.name.value;

      client.writeFragment({
        id,
        fragment,
        data: {...data, __typename}
      });
    }

    render() {
      const {client} = this.props;

      const cache = {
        writeFragment: this.writeFragment,
        readFragment: (args) => client.readFragment(args),
        refetchQueries: this.refetchQueries,
      };
      return <WrappedComponent {...this.props} cache={cache} />
    }
  }

  return withApollo(component);
}

export default testWrappedComponent;
