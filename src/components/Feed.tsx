// tslint:disable:no-console
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import CommentList from './CommentList';

class Feed extends React.PureComponent<any> {
    public render() {

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
                <CardFooter className="d-flex align-items-center" style={cardFooter}>
                    <div>
                        <img className="rounded-circle" style={avatarStyle} src={from.picture} alt={from.picture} />
                    </div>
                    <div className="d-flex align-items-center" style={{ width: "100%" }}>
                        <div style={{
                            width: "-webkit-fill-available"
                        }}>
                            <input style={{ padding: "6px 0px 6px 6px", width: "100%", border: '0px', background: "#e9ebee", borderRadius: "16px" }} type="text" placeholder="Nhập bình luận..." />
                        </div>
                        <div style={{ padding: "6px 0px 2px 5px" }}>
                            <FontAwesomeIcon icon="grin-alt" style={{width: '18px', height: '18px'}}/>
                        </div>
                    </div>
                </CardFooter>
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
