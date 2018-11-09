// tslint:disable:no-console
import React from 'react';
import { Link } from 'react-router-dom';
import { compose, pure } from 'recompose';
import { avatarStyle } from './Feed';


const moreComment = (count: number) => {
    if (count > 0) {
        return (<div style={{ padding: '4px 20px', fontSize: '12px', color: '#365899', cursor: 'pointer' }}>
            ↳ <span>{count} {count > 1 ? 'replies' : 'reply'}</span>
        </div>)
    }
    return;
}

const Comment = (props: any) => {

    const { message, fbId, from, createdAt, commentCount, reactionCount } = props.comment;
    const { alias } = props.group;
    console.log(message);

    return (
        <div className="d-flex mb-1">
            <div>
                <img className="rounded-circle" style={avatarStyle} src={from.picture} alt={from.picture} />
            </div>
            <div>
                <div style={{ position: "relative", }}>
                    <div style={{ fontSize: '14px', backgroundColor: '#e9ebee', borderRadius: '20px', padding: '10px 8px' }}>
                        <strong style={{ color: '#365899' }}>{from.name}</strong> {(message || '').trim()}
                    </div>
                    {props.reactionCount > 0 && (
                        <span style={styleMoreComment}>
                            <strong style={{ fontSize: '14px' }}>👍</strong> {props.reactionCount}
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', fontSize: '12px', paddingLeft: '8px' }}>
                    <div><Link to={'#'}>Like</Link></div>
                    <div className="pl-2"><Link to={'#'}>Delete</Link></div>
                    <div className="pl-2"><Link to={'#'}>Reply</Link></div>
                    <div className="pl-2">{createdAt}</div>
                </div>
                {moreComment(commentCount)}
            </div>
        </div >
    )
}

const styleMoreComment = {
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "1px 1px 0px #BFBFBF",
    color: '#777d88',
    fontSize: '10px',
    padding: "0px 6px",
    position: "absolute",
    right: "-30px",
    top: "25px"
} as React.CSSProperties

export default compose<any, any>(
    pure
)(Comment);
