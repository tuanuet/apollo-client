// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { Fragment, ReactElement } from 'react';
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader, Col } from 'reactstrap';
import { branch, compose, pure, renderComponent, withState } from 'recompose';
import CommentList from './CommentList';
import Loading from './Loading';
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
    height: '300px'
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
    paddingBottom: '0px',
    paddingTop: '5px',

} as React.CSSProperties

const actionBar = {
    borderBottom: '1px solid lightgrey',
    borderTop: '1px solid lightgrey',
    color: '#616770',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: "bold",
    padding: '10px',
} as React.CSSProperties

const cardFooter = {
    background: 'white',
    border: 'none',
    fontSize: '14px',
    padding: '10px 8px 10px 12px'
} as React.CSSProperties

export const COMMENT_LIMIT = 1;

export const GET_COMMENT_FROM_FEEDID = gql`
    query getCommentsFromParentId($postId: String!, $limit: Int!, $sort: String!){
        comments: getCommentsByParentId(fbId: $postId, limit: $limit, sort: $sort) {
            from {
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
const CommentBlockPure = ({ group, getComments: { comments } }: any) => (
    <CardBody style={cardBody}>
        <CommentList group={group} comments={comments} />
    </CardBody>
)

const renderWhileLoading = (component: any, propName = 'data') =>
    branch(
        props => props[propName] && props[propName].loading,
        renderComponent(component),
    );

// Attach the data HoC to the pure component
const CommentBlock = compose<any, any>(
    graphql<any>(GET_COMMENT_FROM_FEEDID, {
        name: "getComments",
        options: (props) => ({
            variables: { postId: props.feedId, limit: props.limit || COMMENT_LIMIT, sort: "createdAt" },
        }),
    }),
    renderWhileLoading(Loading, "getComments"),
    pure,
)(CommentBlockPure);


// Use recompose to keep the state of the input so that we
// can use functional component syntax
const click = withState('click', 'setClick', false);

const Feed = (props: any) => {
    const { click: clickGetComments, setClick } = props;

    const { multiple = false } = props;
    const { comments: detailComments} = props;
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
                <div style={{ marginBottom: '5px' }}>
                    {multiple ? `${(message || '').substring(0, 200)}...` : message}
                    {!multiple || (<Link to={`/${alias}/${uId}`}>Xem thêm</Link>)}
                </div>
                <div style={attachmentContainer}>
                    {attachments.slice(0, 1).map((img: string, i: number) => {
                        return (
                            <img style={attachmentStyle} src={img} alt={img} key={i} />
                        )
                    })}
                </div>
            </CardBody>
            <CardFooter style={cardFooter} className="d-flex align-items-center justify-content-between">
                <div style={{ width: '60%' }}>👍❤️😮 {commentCount - 2} người vả {reactions.map((r: any) => r.from.name).join(', ')}</div>
                <div>{reactionCount} bình luận</div>
            </CardFooter>
            <CardBody className="d-flex text-center" style={actionBar}>
                <Col><FontAwesomeIcon icon="thumbs-up" /> Like</Col>
                <Col onClick={wrapClick}><FontAwesomeIcon icon="comment" /> Comment</Col>
                <Col><FontAwesomeIcon icon="share-alt" /> Share</Col>
            </CardBody>

            { !multiple && <Fragment>
                <CardBody style={cardBody}>
                    <CommentList group={props.group} comments={detailComments} />
                    <Message from={from} postId={fbId} multiple={multiple} group={props.group} />
                </CardBody>
            </Fragment> }

            { clickGetComments && multiple && <Fragment>
                <CommentBlock group={props.group} feedId={fbId} />
                <Message from={from} postId={fbId} multiple={multiple} group={props.group} />
            </Fragment>}
        </Card>
    )
}

export default compose<any, any>(
    click,
    pure
)(Feed);
