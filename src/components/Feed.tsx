import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

const avatarStyle = {
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
    paddingTop: '5px'
} as React.CSSProperties

const cardFooter = {
    background: 'white',
} as React.CSSProperties

class Feed extends React.PureComponent<any> {
    public render() {
        const { attachments, message, fbId, from, reactionCount, commentCount, createdAt } = this.props.feed;
        const { alias } = this.props.group;
        return (
            <Card className="mt-2">
                <CardHeader className="d-flex align-items-center" style={cardHeader}>
                    <div><img className="rounded-circle" src={from.picture} style={avatarStyle} alt={from.picture} /></div>
                    <div className="d-flex flex-column">
                        <strong style={{color: '#365899'}}>{from.name}</strong>
                        <span style={timeCreatedAt}>{createdAt}</span>
                    </div>
                </CardHeader>
                <CardBody style={cardBody}>
                    <div style={{marginBottom: '5px'}}>{message}</div>
                    <div style={attachmentContainer}>
                        {attachments.map((img: string, i: number) => {
                            return (
                                <img style={attachmentStyle} src={img} alt={img} key={i}/>
                            )
                        })}
                    </div>
                </CardBody>
                <CardFooter style={cardFooter} className="d-flex align-items-center justify-content-between">
                    <div>👍❤️😮 {commentCount}</div>
                    <div>{reactionCount} bình luận</div>
                </CardFooter>
            </Card>
        )
    }
}

export default Feed;