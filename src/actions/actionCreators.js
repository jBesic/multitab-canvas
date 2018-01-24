import {
    CREATE_SCREEN,
    CREATE_POINT,
    FILL_SHAPE,
    SELECT_SHAPE,
    DESELECT_SHAPE,
    UNDO_SHAPES,
    REDO_SHAPES
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

export function selectShape(shapeId) {
    return {
        type: SELECT_SHAPE,
        shapeId
    }
}

export function deselectShape(shapeId) {
    return {
        type: DESELECT_SHAPE,
        shapeId
    }
}

export function undoShapesState() {
    return {
        type: UNDO_SHAPES
    }    
}

export function redoShapesState() {
    return {
        type: REDO_SHAPES
    }   
}