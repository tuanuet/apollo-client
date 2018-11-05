// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { CardFooter } from 'reactstrap';
import { GET_DETAIL_FEED } from '../views/DetailFeed/Container';
import { avatarStyle } from './Feed';


export const ADD_COMMENT = gql`
mutation($postId: String!, $comment: Comment) {
    addComment(postId: $postId, comment: $comment) @client {
        fbId
    }
}
`

class Message extends React.Component<any, any> {
    private message: any;

    constructor(props: any) {
        super(props);
        this.message = React.createRef();
    }

    public createComment = () => {
        const message = this.message.current.value;
        const newComment = {
            __typename: "CommentItem",
            commentCount: 0,
            createdAt: "2018-10-31T08:57:41.000",
            fbId: "718982388473129",
            from: this.props.from,
            message,
        }
        this.props.addComment({variables: {comment: newComment, postId: this.props.postId}});
    }
    public render() {
        const { from } = this.props;

        return (
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
                            onKeyUp={this.createComment} />
                    </div>
                    <div style={{ padding: "6px 0px 2px 5px" }}>
                        <FontAwesomeIcon icon="grin-alt" style={{ width: '18px', height: '18px' }} />
                    </div>
                </div>
            </CardFooter>
        )
    }
}

const cardFooter = {
    background: 'white',
    fontSize: '14px',
} as React.CSSProperties

export default graphql<any>(ADD_COMMENT, {
    name: 'addComment',
    // options: {
    //     refetchQueries: [{
    //         query: GET_DETAIL_FEED,
    //         variables: { fbId: '520545424983494_718959955142039' },
    //     }]
    // }
})(Message)
