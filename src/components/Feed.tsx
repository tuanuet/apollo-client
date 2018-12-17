// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { Fragment } from 'react';
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import { compose, pure, withState } from 'recompose';
import { ErrorComponent, LoadingComponent, renderForError, renderWhileLoading, } from './Base';
import CommentList from './CommentList';
import Message from './Message';

export const avatarStyle = {
    height: '40px',
    marginRight: '10px',
    width: '40px',
}

const timeCreatedAt = {
    fontSize: '12px'
}

const attachmentContainer = {
    display: 'flex',
    flexWrap: "wrap",
    height: '400px'
} as React.CSSProperties

const attachmentStyle = {
    objectFit: 'cover',
    width: '100%'
} as React.CSSProperties

const cardHeader = {
    background: 'white',
    border: 'none'
} as React.CSSProperties

const cardBody = {
    padding: "2px 0px"
} as React.CSSProperties

const actionBar = {
    borderBottom: '1px solid lightgrey',
    borderTop: '1px solid lightgrey',
    color: '#616770',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: "bold",
    padding: '10px 4px',
} as React.CSSProperties

const cardFooter = {
    background: 'white',
    border: 'none',
    color: 'darkgrey',
    fontSize: '14px',
    padding: '10px 8px 10px 12px',
} as React.CSSProperties

export const COMMENT_LIMIT = 1;

export const GET_COMMENT_FROM_FEEDID = gql`
    query getCommentsFromParentId($postId: String!, $limit: Int!, $sort: String!){
        comments: getCommentsByParentId(fbId: $postId, limit: $limit, sort: $sort) {
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

const CommentBlockPure = ({ group, getComments }: any) => {
    const { comments } = getComments
    return <CommentList group={group} comments={comments} />
}

// Attach the data HoC to the pure component
const CommentBlock = compose<any, any>(
    graphql<any>(GET_COMMENT_FROM_FEEDID, {
        name: "getComments",
        options: (props) => ({
            variables: { postId: props.feedId, limit: props.limit || COMMENT_LIMIT, sort: "createdAt" },
        }),
    }),
    renderWhileLoading(LoadingComponent, "getComments"),
    renderForError(ErrorComponent, "getComments"),
    pure,
)(CommentBlockPure);


// Use recompose to keep the state of the input so that we
// can use functional component syntax
const withClick = withState('click', 'setClick', false);

const Feed = (props: any) => {
    const { click, setClick } = props;

    const { multiple = false } = props;
    const { comments: detailComments } = props;
    const { attachments, message, fbId, from, reactionCount, commentCount, createdAt, reactions } = props.feed;
    const [groupId, uId] = fbId.split('_');
    const { alias } = props.group;
    const wrapClick = () => setClick(true);

    return (
        <Card className="mt-2">
            <CardHeader className="d-flex align-items-center" style={cardHeader}>
                <div><img className="rounded-circle" src={from.picture} style={avatarStyle} alt={from.picture} /></div>
                <div className="d-flex flex-column">
                    <strong style={{ color: '#365899' }}>{from.name}</strong>
                    <span style={timeCreatedAt}>{createdAt}</span>
                </div>
            </CardHeader>
            <CardBody style={cardBody}>
                <div style={{ margin: '2px 14px', fontSize: "14px" }}>
                    {multiple ? `${(message || '').substring(0, 200)}...` : message}
                    {!multiple || (<Link to={`/${alias}/${uId}`}>Xem thêm</Link>)}
                </div>
                {attachments.length > 0 && (
                    <div style={attachmentContainer}>
                        {attachments.slice(0, 1).map((img: string, i: number) => {
                            return (
                                <img style={attachmentStyle} src={img} alt={img} key={i} />
                            )
                        })}
                    </div>)}
            </CardBody>
            <CardFooter style={cardFooter} className="d-flex align-items-center justify-content-between">
                <div style={{ width: '75%' }}>👍❤️😮 {reactionCount - 2} người vả {reactions.map((r: any) => r.from.name).join(', ')}</div>
                <div>{commentCount} bình luận</div>
            </CardFooter>
            <CardBody className="d-flex text-center" style={actionBar}>
                <Col><FontAwesomeIcon icon="thumbs-up" /> Like</Col>
                <Col onClick={wrapClick}><FontAwesomeIcon icon="comment" /> Comment</Col>
                <Col><FontAwesomeIcon icon="share-alt" /> Share</Col>
            </CardBody>

            {!multiple && <Fragment>
                <CardBody style={{ padding: "10px 16px" }} >
                    <CommentList group={props.group} comments={detailComments} />
                    <Message from={from} postId={fbId} multiple={multiple} group={props.group} />
                </CardBody>
            </Fragment>}

            {click && multiple && <CardBody style={{ padding: "10px 16px" }}>
                <CommentBlock group={props.group} feedId={fbId} />
                <Message from={from} postId={fbId} multiple={multiple} group={props.group} />
            </CardBody>}
        </Card>
    )
}

export default compose<any, any>(
    withClick,
    pure
)(Feed);
