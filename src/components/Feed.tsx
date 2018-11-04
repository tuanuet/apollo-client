import React from 'react';
import { Link } from 'react-router-dom';

class Feed extends React.PureComponent<any> {
    public render() {
        const { message, fbId } = this.props.feed;
        const { alias } = this.props.group;
        return (
            <div>
                <Link to={`/${alias}/${fbId.split('_')[1]}`}>{fbId}</Link>
                : {message}</div>
        )
    }
}

export default Feed;