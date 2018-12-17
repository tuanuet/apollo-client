// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import { compose, withHandlers, withState } from 'recompose'
import { GET_DETAIL_FEED } from 'src/views/DetailFeed/Container';
import { avatarStyle } from './Feed';

const MUTATION_COMMENT = gql`
    mutation mutationComment($input: InputComment!) {
        mutationComment(inputComment: $input) {
            from {
                id
                name
                fbId
                picture
            }
            fbId
            message
            commentCount
            reactionCount
            createdAt
        }
    }
`

const CommentBox = (props: any) => {
    const { from } = props;
    return (
        <div className="d-flex align-items-center" style={cardFooter}>
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
                        value={props.message}
                        onChange={props.onChangeMessage}
                        onKeyUp={props.handleMutationComment}
                    />
                </div>
                <div style={{ padding: "6px 0px 2px 5px" }}>
                    <FontAwesomeIcon icon="grin-alt" style={{ width: '18px', height: '18px' }} />
                </div>
            </div>
        </div>
    )
}

export default compose<any, any>(
    withState('message', 'setMessage', ''),
    graphql(MUTATION_COMMENT, {
        name: 'mutationComment',
        options: (props: any) => ({

            onCompleted: () => {
                props.setMessage('')
            },
            // update: (cache: any, { data: { mutationComment } }: any, arg3: any) => {
            //     const { detailFeed } = cache.readQuery({
            //         query: GET_DETAIL_FEED,
            //         variables: {
            //             fbId: props.postId
            //         }
            //     });

            //     cache.writeQuery({
            //         data: {
            //             detailFeed: {
            //                 ...detailFeed,
            //                 commentCount: detailFeed.commentCount + 1,
            //                 comments: detailFeed.comments.concat([mutationComment])
            //             }
            //         },
            //         query: GET_DETAIL_FEED,
            //         variables: {
            //             fbId: props.postId
            //         }
            //     });
            // },
            variables: {
                input: {
                    creator: props.from.id,
                    groupId: props.group.fbId,
                    message: props.message.trim(),
                    postId: props.postId,
                }
            }
        }),
    }),
    withHandlers({
        handleMutationComment: (props: any) => (e: any) => {
            if (e.key === 'Enter') {
                props.mutationComment()
            }
        },
        onChangeMessage: (props: any) => (e: any) => {
            props.setMessage(e.target.value)
        }
    }),
)(CommentBox);

// export default Message;
const cardFooter = {
    background: 'white',
    fontSize: '14px',
    padding: '8px 0px'
} as React.CSSProperties


