import React from 'react'
import { startLogout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const TaskBar = () => {

    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth)

    const hanleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <div className="notes__appbar d-flex">
            <input
                id="fileSelector"
                type="file"
                name="file"
                style={{ display: 'none' }}

            />
            <div>
                {/* <button
                    className="btn"
                >
                    Picture
                </button>

                <button className="btn"
                >
                    Save
                </button> */}

                {/* <button type="button"
                    className="btn btn-danger"
                >
                    Eliminar
                    </button> */}

                <button type="button"
                    className="btn ms-2"
                    onClick={hanleLogout}
                >
                    Logout
                </button>

                <span> { name }</span>
            </div>
        </div>


    )
}

export default TaskBar
