import {
    CREATE_SCREEN,
    CREATE_POINT,
    FILL_SHAPE
} from './actions';

export function createScreen() {
    return {
        type: CREATE_SCREEN
    }
}

export function createPoint(coordinates, screenId, circleCoordinate) {
    return {
        type: CREATE_POINT,
        coordinates: coordinates,
        screenId: screenId,
        circleCoordinate: circleCoordinate
    }
}

export function fillShape(shapeId, fillColor) {
    return {
        type: FILL_SHAPE,
        shapeId,
        shapeConfig: {
            fillColor: fillColor
        }
    }
}