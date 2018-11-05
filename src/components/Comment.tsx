// tslint:disable:no-console
import React from 'react';
import { Link } from 'react-router-dom';
import { avatarStyle } from './Feed';

class Comment extends React.Component<any> {
    public moreComment = (count: number) => {
        if (count > 0) {
            return (<div style={{ padding: '4px 20px', fontSize: '12px', color: '#365899', cursor: 'pointer'}}>
                ↳ <span>{count} {count > 1 ? 'replies' : 'reply'}</span>
            </div>)
        }
        return;
    }
    public render() {
        const { message, fbId, from, createdAt, commentCount } = this.props.comment;

        const { alias } = this.props.group;
        return (
            <div className="d-flex mb-1">
                <div>
                    <img className="rounded-circle" style={avatarStyle} src={from.picture} alt={from.picture} />
                </div>
                <div>
                    <div>
                        <div style={{ fontSize: '14px', backgroundColor: '#e9ebee', borderRadius: '20px', padding: '10px 8px' }}>
                            <strong style={{ color: '#365899' }}>{from.name}</strong> {message}</div>
                    </div>
                    <div style={{ display: 'flex', fontSize: '12px', paddingLeft: '8px' }}>
                        <div><Link to={'#'}>Delete</Link></div>
                        <div className="pl-2"><Link to={'#'}>Reply</Link></div>
                        <div className="pl-2">{createdAt}</div>
                    </div>
                    {this.moreComment(commentCount)}
                </div>
            </div>
        )
    }
}

export default Comment;
