import {
    entries,
    identity,
    omit,
    upperFirst,
} from "lodash";

import {
    compose,
    lifecycle,
    mapProps,
    withHandlers,
    withStateHandlers,
} from "recompose";

// Handle all backend APIs
function withFetcher(
    name: string,
    fetch: (props: any) => Promise<any>,
    { fetchOnMount = false } = {}
) {
    return compose(
        withStateHandlers<{ [key: string]: { data: any; loading: boolean; error: any } }, any, any>(
            {
                [`${name}Fetcher`]: {
                    data: null,
                    error: null,
                    loading: false,
                }
            },
            {
                [`receive${upperFirst(name)}Data`]: () => (data: any) => ({
                    [`${name}Fetcher`]: {
                        data,
                        error: null,
                        loading: false,
                    }
                }),
                [`receive${upperFirst(name)}Error`]: ({[`${name}Fetcher`]: { data }}) => (error: any) => ({
                    [`${name}Fetcher`]: {
                        data,
                        error: error || true,
                        loading: false,
                    }
                }),
                [`start${upperFirst(name)}Fetch`]: ({[`${name}Fetcher`]: prevState}) => () => ({
                    [`${name}Fetcher`]: {
                        ...prevState,
                        loading: true
                    }
                })
            }
        ),
        withHandlers({
            ["fetch" + upperFirst(name)]: (props: any) => () => {
                props[`start${upperFirst(name)}Fetch`]();
                fetch(props).then(
                    props[`receive${upperFirst(name)}Data`],
                    props[`receive${upperFirst(name)}Error`]
                );
            }
        }),
        mapProps(props =>
            omit(props, [
                `receive${upperFirst(name)}Data`,
                `receive${upperFirst(name)}Error`,
                `start${upperFirst(name)}Fetch`
            ])
        ),
        fetchOnMount
            ? lifecycle({
                componentDidMount() {
                    (this as any).props["fetch" + upperFirst(name)]();
                }
            })
            : identity
    );
}

// example
// const GithubApi = withFetcher(
//     "githubApis",
//     async () => {
//         try {
//             const response = await fetch("https://api.github.com");
//             return await response.json();
//         } catch (error) {
//             throw error.message;
//         }
//     },
//     { fetchOnMount: true }
// )((props: any) => (
//     <div className="container">
//         <p>error: {JSON.stringify(props.githubApisFetcher.error)}</p>
//         <p>loading: {JSON.stringify(props.githubApisFetcher.loading)}</p>
//         <dl>
//             {entries(props.githubApisFetcher.data).map(([key, value]) => (
//                 <React.Fragment key={key}>
//                     <dt>{key}</dt>
//                     <dd>{value}</dd>
//                 </React.Fragment>
//             ))}
//         </dl>
//     </div>
// ));

// ReactDOM.render(<GithubApi />, document.getElementById("app"));
