import React from 'react';
import { connect } from 'react-redux';

import { createPoint } from '../../actions/actionCreators';

function canvasClickHandler(ev, props) {
    const svgCoordinates = {
        x: ev.currentTarget.getBoundingClientRect().left,
        y: ev.currentTarget.getBoundingClientRect().top
    }

    const pointCoordinates = {
        x: ev.clientX,
        y: ev.clientY
    }

    let circleCoordinate = {};
    if (ev.target.tagName.toLowerCase() === 'circle') {
        circleCoordinate.x = ev.target.cx.baseVal.value;
        circleCoordinate.y = ev.target.cy.baseVal.value;
    }

    props.createPointHandler({
            x: pointCoordinates.x - svgCoordinates.x,
            y: pointCoordinates.y - svgCoordinates.y
        }, props.match.params.screen_id, circleCoordinate);
}

function Canvas(props) {
    let pointsSvg = [];
    let shapesSvg = [];
    let key = 0;
    for (const shapeId in props.shapes) {
        if (props.shapes.hasOwnProperty(shapeId)) {
            const shape = props.shapes[shapeId];
            let pointsPolyline = [];
            shape.points.forEach(pointCoordinates => {
                pointsPolyline.push(pointCoordinates.x + ',' + pointCoordinates.y)
                pointsSvg.push(<circle key={key} cx={pointCoordinates.x} cy={pointCoordinates.y} r="5" fill="#F55" />);
                key = key + 1;
            });

            shapesSvg.push(<polyline key={shapeId} fill={shape.fillColor} stroke="#CCC" points={pointsPolyline.join(' ')} onClick={(ev) => { console.log(ev); }} />);
        }
    }

    return (
        <div className='canvas'>
            <svg onClick={event => canvasClickHandler(event, props)} xmlns="http://www.w3.org/2000/svg">
                {shapesSvg}
                {pointsSvg}
            </svg>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        createPointHandler: (coordinates, screen_id, circleCoordinate) => dispatch(createPoint(coordinates, screen_id, circleCoordinate))
    }
}

const mapStateToProps = (state, ownProps) => {
    const shapes = {};
    Object.keys(state.shapes).forEach(shapeId => {
        if (state.shapes[shapeId].screenId === ownProps.match.params.screen_id) {
            shapes[shapeId] = { ...state.shapes[shapeId] }
        }
    });

    return {
        screens: { ...state.screens },
        shapes: shapes
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);