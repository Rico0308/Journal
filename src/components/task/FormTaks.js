import React from 'react'
import { useDispatch } from 'react-redux'
import { startNewTask } from '../../actions/tasks'

export const FormTask = () => {

    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault();
        let title = document.getElementById("task-title").value;
        let body = document.getElementById("task-description").value;
        dispatch(startNewTask(title,body))
        resetInputs();
    }

    const handleUpFile = () => {
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // dispatch(startUploadFile(file));
    }

    const resetInputs = () => {
        document.getElementById("task-title").value = "";
        document.getElementById("task-description").value = "";
    }

    return (
        <div className="container text-center ">
            <div className="">

                <div className="card-body ">

                    <h1 className="h4">Add Task</h1>

                    <form id="task-form">
                        <div className="form-group py-3">
                            <input
                                type="text" id="task-title"
                                className="form-control"
                                placeholder="Task Title"
                                name="title"
                               />
                        </div>

                        <div className="form-group">
                            <textarea
                                id="task-description"
                                rows="3"
                                className="form-control"
                                placeholder="Task Description"
                                name="body"
                            >
                            </textarea>
                        </div>

                        <input
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}

                        />
                        <div className="d-grid gap-2 col-6 mx-auto py-3">
                            <button className="btn btn-primary" type="button" onClick={handleUpFile}>
                                Cargar imagen
                            </button>
                        </div>

                        <button className="btn btn-primary" id="btn-task-form" onClick={handleSave} >
                            Save
                       </button>

                    </form>
                </div>
            </div>

        </div>
    )
}
