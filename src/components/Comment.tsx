import React from 'react';
import { Link } from 'react-router-dom';

class Comment extends React.PureComponent<any> {
    public render() {
        const { message, fbId } = this.props.comment;
        const { alias } = this.props.group;
        return (
            <div>
                {/* <Link to={`/${alias}/${fbId}`}>{fbId}</Link> */}
                : {message}</div>
        )
    }
}

export default Comment;