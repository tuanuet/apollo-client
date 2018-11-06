// tslint:disable:no-console
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import CommentList from './CommentList';
import Message from './Message';

class Feed extends React.PureComponent<any> {

    public render() {
        const { multiple = false } = this.props;
        const { attachments, message, fbId, from, reactionCount, commentCount, createdAt, reactions, comments } = this.props.feed;
        const [groupId, uId] = fbId.split('_');
        const { alias } = this.props.group;
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
                    <div style={{ marginBottom: '5px' }}>{message} <p><Link to={`/${alias}/${uId}`}>Xem thêm</Link></p></div>
                    <div style={attachmentContainer}>
                        {attachments.map((img: string, i: number) => {
                            return (
                                <img style={attachmentStyle} src={img} alt={img} key={i} />
                            )
                        })}
                    </div>
                </CardBody>
                <CardFooter style={cardFooter} className="d-flex align-items-center justify-content-between">
                    <div>👍❤️😮 {commentCount - 2} người vả {reactions.map((r: any) => r.from.name).join(', ')}</div>
                    <div>{reactionCount} bình luận</div>
                </CardFooter>
                <CardBody style={cardBody}>
                    <CommentList group={this.props.group} comments={comments} />
                </CardBody>
                <Message from={from} postId={fbId} multiple={multiple} group={this.props.group}/>
            </Card>
        )
    }
}


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

const cardFooter = {
    background: 'white',
    fontSize: '14px',
} as React.CSSProperties

export default Feed;
