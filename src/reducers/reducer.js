import {
    CREATE_SCREEN,
    CREATE_POINT,
    FILL_SHAPE,
    LINE_STYLE
} from '../actions/actions';

export default function reducer(state = [], action) {
    let updateState = null;
    let updateShapes = null;

    switch (action.type) {
        case CREATE_SCREEN:
            updateState = { ...state };
            const updateScreens = { ...updateState.screens };

            if (Object.keys(updateScreens).length === 5) {
                return updateState;
            }

            let lastScreenId = Object.keys(updateScreens).reduce((previousScreenId, currentScreenId) => {
                return Math.max(previousScreenId, currentScreenId);
            });

            lastScreenId = Number.parseInt(lastScreenId, 10);
            updateScreens[lastScreenId + 1] = {
                screenId: lastScreenId + 1,
                isDeleted: false
            };

            updateState.screens = updateScreens;
            return updateState;

        case CREATE_POINT:
            updateState = { ...state };
            updateShapes = { ...updateState.shapes };

            let lastShapeId = Object.keys(updateShapes).reduce((previousShapeId, currentShapeId) => {
                return Math.max(previousShapeId, currentShapeId);
            }, 0);

            lastShapeId = Number.parseInt(lastShapeId, 10);

            const doesShapeExists = updateShapes.hasOwnProperty(lastShapeId) ? true : false;
            let closeShape = false;
            if (doesShapeExists && Object.keys(action.circleCoordinate).length > 0) {
                const isXequal = action.circleCoordinate.x === updateShapes[lastShapeId].points[0].x ? true : false;
                const isYequal = action.circleCoordinate.y === updateShapes[lastShapeId].points[0].y ? true : false;
                closeShape = isXequal && isYequal;
            }

            let previousClose = false;
            if (doesShapeExists &&
                updateShapes[lastShapeId].points.length > 2 &&
                updateShapes[lastShapeId].points[0].x === updateShapes[lastShapeId].points[updateShapes[lastShapeId].points.length - 1].x &&
                updateShapes[lastShapeId].points[0].y === updateShapes[lastShapeId].points[updateShapes[lastShapeId].points.length - 1].y) {
                previousClose = true;
            }

            if (!doesShapeExists || previousClose) {
                updateShapes[lastShapeId + 1] = {
                    shapeId: lastShapeId + 1,
                    screenId: action.screenId,
                    points: [],
                    isCompleted: false,
                    fillColor: 'none'
                };
                updateShapes[lastShapeId + 1].points.push(action.coordinates);
            }

            if (doesShapeExists && !previousClose && !closeShape) {
                updateShapes[lastShapeId].points.push(action.coordinates);
            }

            if (!previousClose && closeShape) {
                updateShapes[lastShapeId].fillColor = '#CCC';
                updateShapes[lastShapeId].isCompleted = true;
                updateShapes[lastShapeId].points.push(action.circleCoordinate);
            }

            updateState.shapes = updateShapes;
            return updateState;

        case FILL_SHAPE:
            updateState = { ...state };
            const updateShape = { ...updateState.shapes[action.shapeId] }
            updateShape.fillColor = action.shapeConfig.fillColor;

            updateState.shapes[action.shapeId] = updateShape;
            return updateState;

        default:
            return state;
    }
}