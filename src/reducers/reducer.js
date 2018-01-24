import {
    CREATE_SCREEN,
    CREATE_POINT,
    FILL_SHAPE,
    SELECT_SHAPE,
    DESELECT_SHAPE,
    UNDO_SHAPES,
    REDO_SHAPES
} from '../actions/actions';

export default function reducer(state = [], action) {
    let updateState = null;
    let updateShapes = null;
    let updateShape = null;

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

            let latestAddedShapeId = Object.keys(updateShapes).reduce((previousShapeId, currentShapeId) => {
                return Math.max(previousShapeId, currentShapeId);
            }, 0);

            let latestAddedShapeIdForActiveScreen = Object.keys(updateShapes).filter(shapeId => {
                return updateShapes[shapeId].screenId === action.screenId;
            }).reduce((previousShapeId, currentShapeId) => {
                return Math.max(previousShapeId, currentShapeId);
            }, 0);

            latestAddedShapeId = Number.parseInt(latestAddedShapeId, 10);
            latestAddedShapeIdForActiveScreen = Number.parseInt(latestAddedShapeIdForActiveScreen, 10);
            const differentScreen = (function () {
                if (latestAddedShapeId === 0) {
                    return false;
                }

                return action.screenId !== updateShapes[latestAddedShapeId].screenId;
            })();

            let firstPointOfShapeIsClicked = false;
            if (Object.keys(action.circleCoordinate).length > 0) {
                const isXequal = action.circleCoordinate.x === updateShapes[latestAddedShapeIdForActiveScreen].points[0].x ? true : false;
                const isYequal = action.circleCoordinate.y === updateShapes[latestAddedShapeIdForActiveScreen].points[0].y ? true : false;
                firstPointOfShapeIsClicked = isXequal && isYequal;
            }

            if (latestAddedShapeId === 0) {
                updateShapes[latestAddedShapeId + 1] = {
                    shapeId: latestAddedShapeId + 1,
                    screenId: action.screenId,
                    points: [],
                    isCompleted: false,
                    isSelected: false,
                    fillColor: 'none'
                };

                updateShapes[latestAddedShapeId + 1].points.push(action.coordinates);
            } else if (differentScreen) {
                if (updateShapes[latestAddedShapeIdForActiveScreen] && updateShapes[latestAddedShapeIdForActiveScreen].isCompleted) {
                    updateShapes[latestAddedShapeId + 1] = {
                        shapeId: latestAddedShapeId + 1,
                        screenId: action.screenId,
                        points: [],
                        isCompleted: false,
                        isSelected: false,
                        fillColor: 'none'
                    };

                    updateShapes[latestAddedShapeId + 1].points.push(action.coordinates);
                } else if (updateShapes[latestAddedShapeIdForActiveScreen] && !updateShapes[latestAddedShapeIdForActiveScreen].isCompleted) {
                    updateShapes[latestAddedShapeIdForActiveScreen].points = [...updateShapes[latestAddedShapeIdForActiveScreen].points, action.coordinates];
                } else {
                    updateShapes[latestAddedShapeId + 1] = {
                        shapeId: latestAddedShapeId + 1,
                        screenId: action.screenId,
                        points: [],
                        isCompleted: false,
                        isSelected: false,
                        fillColor: 'none'
                    };

                    updateShapes[latestAddedShapeId + 1].points.push(action.coordinates);
                }
            } else if (updateShapes[latestAddedShapeIdForActiveScreen].isCompleted) {
                updateShapes[latestAddedShapeId + 1] = {
                    shapeId: latestAddedShapeId + 1,
                    screenId: action.screenId,
                    points: [],
                    isCompleted: false,
                    isSelected: false,
                    fillColor: 'none'
                };

                updateShapes[latestAddedShapeId + 1].points.push(action.coordinates);
            } else if (firstPointOfShapeIsClicked) {
                updateShapes[latestAddedShapeIdForActiveScreen].points = [...updateShapes[latestAddedShapeIdForActiveScreen].points, action.circleCoordinate];
            } else {
                updateShapes[latestAddedShapeIdForActiveScreen].points = [...updateShapes[latestAddedShapeIdForActiveScreen].points, action.coordinates];
            }

            if (firstPointOfShapeIsClicked) {
                updateShapes[latestAddedShapeIdForActiveScreen].fillColor = '#CCCCCC';
                updateShapes[latestAddedShapeIdForActiveScreen].isCompleted = true;
            }

            updateState.shapes = updateShapes;
            updateState.history = {
                ...state.history,
                shapesState: [...state.history.shapesState, state.shapes]
            };

            return updateState;

        case SELECT_SHAPE:
            updateState = { ...state };

            const selectedShape = Object.keys(updateState.shapes).filter(shapeId => {
                return updateState.shapes[shapeId].isSelected;
            });

            if (selectedShape === action.shapeId) {
                return state;
            }

            if (selectedShape.length > 0) {
                const updateSelectedShape = { ...updateState.shapes[selectedShape[0]] };
                updateSelectedShape.isSelected = false;
                updateState.shapes[selectedShape[0]] = updateSelectedShape;
            }

            updateShape = { ...updateState.shapes[action.shapeId] }
            updateShape.isSelected = true;

            updateState.shapes[action.shapeId] = updateShape;
            return updateState;

        case DESELECT_SHAPE:
            updateState = { ...state };
            updateShape = { ...updateState.shapes[action.shapeId] }

            if (!updateShape.isSelected) {
                return state;
            }

            updateShape.isSelected = false;

            updateState.shapes[action.shapeId] = updateShape;
            return updateState;


        case FILL_SHAPE:
            updateState = { ...state };
            updateShape = { ...updateState.shapes[action.shapeId] }
            updateShape.fillColor = action.shapeConfig.fillColor;

            updateState.shapes[action.shapeId] = updateShape;
            updateState.history = {
                ...state.history,
                shapesState: [...state.history.shapesState, state.shapes]
            };
            return updateState;

        case UNDO_SHAPES:
        console.log(UNDO_SHAPES);
            break;

        case REDO_SHAPES:
        console.log(REDO_SHAPES);
            break;

        default:
            return state;
    }
}