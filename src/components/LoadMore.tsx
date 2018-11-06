import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react';

export default class LoadMore extends React.PureComponent<any> {
    public wrap = () => {
        this.props.onLoadMore();
    }
    public render() {

        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '6px 0px'
        }}>
            <FontAwesomeIcon icon="circle-notch" style={{ width: '24px', height: '24px' }} spin={true} />
        </div>
    }

}
