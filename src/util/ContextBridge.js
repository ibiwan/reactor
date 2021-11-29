// context-bridge component

/*
 * type ContextBridgeProps = {
 *    contexts: React.Context<any>[];
 *    barrierRender: (children: React.ReactElement | null) => React.ReactElement | null;
 *    children: React.ReactNode;
 * };
 */

export const ContextBridge = ({ barrierRender, contexts, children }) => {

    const providers = values => {

        const getValue = i => values[ values.length - 1 - i ];

        return <>
          {contexts.reduce((innerProviders, Context, i) => (
            <Context.Provider value={getValue(i)}>
                {innerProviders}
            </Context.Provider>
          ), children)}
        </>;
    };

    const consumers = contexts.reduce((getChildren, Context) => (
        values => <Context.Consumer>
            {value => getChildren([ ...values, value ])}
        </Context.Consumer>
    ), values => barrierRender(providers(values)));

    return consumers([]);
};
