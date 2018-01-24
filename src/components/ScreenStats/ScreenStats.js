import React from 'react';

import { connect } from 'react-redux';

function ScreenStats(props) {
    let numberOfShapes = 0;
    let numberOfColors = {};
    Object.keys(props.shapes).forEach(shapeId => {
        if (props.shapes[shapeId].isCompleted) {
            numberOfShapes = numberOfShapes + 1;

            if (!numberOfColors.hasOwnProperty(props.shapes[shapeId].fillColor)) {
                numberOfColors[props.shapes[shapeId].fillColor] = 0;
            }
            numberOfColors[props.shapes[shapeId].fillColor] = numberOfColors[props.shapes[shapeId].fillColor] + 1;
        }
    });

    return numberOfShapes > 0 ? (
        <div className='screen-stats'>
            <div className='number-of-shapes'><span className='number-placeholder'>{numberOfShapes}</span><label>Number of closed shapes</label></div>
            <div className='used-colors'>
                {Object.keys(numberOfColors).map(color => {
                    return (
                        <div key={color} className='color-count'>
                            <span style={{ backgroundColor: color }} className='number-placeholder'>
                                {numberOfColors[color]}
                            </span><label>{color}</label>
                        </div>
                    );
                })}
            </div>
        </div>
    ) : null;
}

const mapStateToProps = (state, ownProps) => {
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

export default connect(mapStateToProps)(ScreenStats);