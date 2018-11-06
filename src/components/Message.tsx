// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import { CardFooter } from 'reactstrap';
import { avatarStyle } from './Feed';
import { FEED_LIMIT } from './FeedList';


export const ADD_COMMENT = gql`
mutation($postId: String!, $comment: Comment) {
    addComment(postId: $postId, comment: $comment) @client {
        fbId
    }
}
`

export const ADD_COMMENT_IN_FEEDS = gql`
mutation($groupId: String!, $limit: Int!, $postId: String!, $comment: Comment) {
    addCommentInFeeds(groupId: $groupId, limit: $limit, postId: $postId, comment: $comment) @client {
        fbId
    }
}
`

class Message extends React.PureComponent<any, any> {
    private message: any;

    constructor(props: any) {
        super(props);
        this.message = React.createRef();
    }

    public createComment = (e: any, addComment: (input: any) => void) => {
        const message = this.message.current.value;
        const newComment = {
            __typename: "Comment",
            commentCount: 0,
            createdAt: "2018-10-31T08:57:41.000",
            fbId: "718982388473129",
            from: this.props.from,
            message,
        }

        addComment({
            variables: {
                comment: newComment,
                groupId: this.props.group.fbId,
                limit: FEED_LIMIT,
                postId: this.props.postId,
            }
        });
    }

    public wrap = (addComment: () => void) =>
        (e: any) => {
            if (e.key === 'Enter') {
                this.createComment(e, addComment)
            }
        }

    public updateAfterAddComment = (cache: any, { data: { addComment } }: any) => {
        this.message.current.value = '';
    }

    public render() {
        const { from, multiple } = this.props;

        return (
            <Mutation
                mutation={multiple ? ADD_COMMENT_IN_FEEDS : ADD_COMMENT}
                update={this.updateAfterAddComment}
            >
                {(addComment) => (
                    <CardFooter className="d-flex align-items-center" style={cardFooter}>
                        <div>
                            <img className="rounded-circle" style={avatarStyle} src={from.picture} alt={from.picture} />
                        </div>
                        <div className="d-flex align-items-center" style={{ width: "100%" }}>
                            <div style={{
                                width: "-webkit-fill-available"
                            }}>
                                <input
                                    style={{ padding: "6px 0px 6px 6px", width: "100%", border: '0px', background: "#e9ebee", borderRadius: "16px" }} type="text"
                                    placeholder="Nhập bình luận..."
                                    ref={this.message}
                                    onKeyUp={this.wrap(addComment)} />
                            </div>
                            <div style={{ padding: "6px 0px 2px 5px" }}>
                                <FontAwesomeIcon icon="grin-alt" style={{ width: '18px', height: '18px' }} />
                            </div>
                        </div>
                    </CardFooter>
                )}
            </Mutation>
        )
    }
}

const cardFooter = {
    background: 'white',
    fontSize: '14px',
} as React.CSSProperties

export default Message;
