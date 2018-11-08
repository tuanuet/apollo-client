// tslint:disable:no-console
import React from 'react';
import Comment from '../components/Comment';


class CommentList extends React.PureComponent<any> {
    public render() {
        const comments = this.props.comments;
        return (
            <div>
                {comments.map((comment: any, i: number) => <Comment group={this.props.group} comment={comment} key={`${comment.fbId}_${i}`} />)}
            </div>

        )
    }
}

export default CommentList;
