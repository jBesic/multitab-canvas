import React from 'react';
import { connect } from 'react-redux';

import { fillShape } from '../../actions/actionCreators';

function ScreenConfig(props) {
    const shapesConfig = Object.keys(props.shapes).filter(shapeId => {
        return props.shapes[shapeId].isCompleted;
    }).map(shapeId => {
        return (
            <div key={shapeId} className='shape-config-wrapper'>
                <label>Shape fill color</label>
                <input type='color' value={props.shapes[shapeId].fillColor} onChange={ev => props.fillShapeHandler(shapeId, ev.target.value)} />
            </div>
        );
    });

    return shapesConfig.length > 0 ? (
        <div className='screen-config'>
            {shapesConfig}
        </div>
    ) : null;
}

const mapDispatchToProps = dispatch => {
    return {
        fillShapeHandler: (shapeId, color) => dispatch(fillShape(shapeId, color))
    };
};

const mapStatsToProps = (state, ownProps) => {
    const shapes = {};
    Object.keys(state.shapes).forEach(shapeId => {
        if (state.shapes[shapeId].screenId === ownProps.match.params.screen_id) {
            shapes[shapeId] = { ...state.shapes[shapeId] }
        }
    });

    return {
        shapes: shapes
    };
};

export default connect(mapStatsToProps, mapDispatchToProps)(ScreenConfig);