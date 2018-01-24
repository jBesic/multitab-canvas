import React from 'react';
import { connect } from 'react-redux';

import { undoShapesState, redoShapesState } from '../../actions/actionCreators';

function UndoRedoShapes(props) {
    return (
        <div className='undo-redo-shapes'>
            <button type='button' disabled={!canUndo(props.history)} className='undo' onClick={() => props.undo()}>Undo</button>
            <button type='button' disabled={!canRedo(props.history)} className='redo' onClick={() => props.redo()}>Redo</button>
        </div>
    );
}

// props.history.indexInHistory < Object.keys(props.history.shapesState).length - 1 ? true : false
function canUndo(history) {
    if (history.indexInHistory !== null && history.indexInHistory !== 0) {
        return true;
    }

    return false;
}

function canRedo(history) {
    if (history.indexInHistory !== null && history.indexInHistory < Object.keys(history.shapesState).length - 1) {
        return true;
    }

    return false;
}

const mapStateToProps = state => {
    return {
        history: { ...state.history }
    };
}

const mapDispatchToProps = dispatch => {
    return {
        undo: () => dispatch(undoShapesState()),
        redo: () => dispatch(redoShapesState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedoShapes);