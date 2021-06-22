import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { activeTask, startDeleting } from '../../actions/tasks'
import { FaEdit } from "react-icons/fa"
import Modal from "react-bootstrap/Modal"
import { useModal } from '../../hooks/useModal'
import { startSaveTask, startUploading } from '../../actions/tasks'

const Task = () => {

    const dispatch = useDispatch();

    const { tasks } = useSelector(state => state.tasks);

    const [isOpen, values, showModal, hideModal, handleInputChange, handleChange] = useModal();
    const { title, body, id, date, url='' } = values;

    const deleteTask = (e, id) => {
        dispatch(startDeleting(id));
    }

    const handleEdit = (e, task) => {
        dispatch(
            activeTask(
                task.id,
                {
                    ...task
                }
            )
        )
        handleInputChange(task)
        showModal()
    }

    const handlePicture = () => {
        console.log('Clic')
        document.querySelector('#fileSelected').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        dispatch(startUploading(file));
    }

    const handleSave = (e, id, title, body, date) => {
        let url = document.getElementById('fileSelected').value
        console.log(url)
        let taskSave = {id, title, body, date}
        dispatch(startSaveTask(taskSave));
        hideModal()
    }

    return (
        <div className="row row-cols-1 row-cols-md-2 g-4">
            {
                tasks.map(task => (
                    <div className="card" key={task.id}>
                    {
                    (task.url)
                    &&
                    (
                        <div className="notes__image">
                            <img
                                src={task.url}
                                alt="imagen"
                            />
                        </div>
                    )
                }
                        <div className="row">
                            <div className="col-10">
                                <h3>{task.title}</h3>
                                <p className="card-text">{task.body}</p>
                            </div>
                            <div className="col">
                                <span aria-hidden="true" onClick={(e) => { deleteTask(e, task.id) }} style={{ cursor: 'pointer' }}>&times;</span>
                            </div>
                            <div className="journal__entry-date-box">
                                <span>{moment(task.date).format('dddd')}-{moment(task.date).format('Do')}</span>
                            </div>
                            <div className="col">
                                <span aria-hidden="true" onClick={(e) => { handleEdit(e, task) }} style={{ cursor: 'pointer' }}><FaEdit /></span>
                            </div>
                        </div>
                    </div>
                ))
            }

            <Modal show={isOpen} onHide={hideModal} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Editar Tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group py-3">
                        <input
                            type="text" id="task-title-modal"
                            className="form-control"
                            placeholder="Task Title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            id="task-description-modal"
                            rows="3"
                            className="form-control"
                            placeholder="Task Description"
                            name="body"
                            value={body}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>

                    <button className="btn btn-primary mt-2" onClick={handlePicture}>
                        Agregar Imagen
                    </button>

                    <input
                        id="fileSelected"
                        type="file"
                        name="file"
                        style={{display: 'none'}}
                        onChange={handleFileChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" onClick={hideModal}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={(e) => {handleSave(e, id, title, body, date)}}>Guardar</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Task
