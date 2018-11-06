// tslint:disable:no-console
import React from 'react';
import Comment from '../components/Comment';


class CommentList extends React.Component<any> {
    public render() {
        const comments = this.props.comments;
        return (
            <div>
                {comments.map((comment: any, i: number) => <Comment {...this.props} comment={comment} key={`${comment.fbId}_${i}`} />)}
            </div>

        )
    }
}

export default CommentList;
