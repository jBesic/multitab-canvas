import React from 'react';
import { connect } from 'react-redux';

import { undoShapesState, redoShapesState } from '../../actions/actionCreators';

function UndoRedoShapes(props) {
    return (
        <div className='undo-redo-shapes'>
            <button type='button' className='undo' onClick={() => props.undo()}>Undo</button>
            <button type='button' className='redo' onClick={() => props.redo()}>Redo</button>
        </div>
    );
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