// tslint:disable:no-console
import gql from 'graphql-tag';
import React from 'react';
import Comment from '../components/Comment';


class CommentList extends React.PureComponent<any> {
    public render() {
        const comments = this.props.comments;
        return (
            comments.map((comment: any) => <Comment {...this.props} comment={comment} key={comment.fbId} />)
        )
    }
}

export default CommentList;
