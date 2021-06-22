import Swal from 'sweetalert2';

import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadTasks } from '../helpers/loadTasks';
import { fileUpload } from '../helpers/fileUpload';

export const startNewTask = (title, body) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newTask = {
            title: title,
            body: body,
            date: new Date().getTime()
        }

        const doc = await db.collection(`${ uid }/jurnal/notes`).add( newTask );
        dispatch( activeTask( uid, newTask ) );
        dispatch( addNewTask( uid, newTask ) );
        //Hacen lo mismo que las dos líneas anterior
        // dispatch( activeNote( doc.id, newNote ) );
        // dispatch( addNewNote( doc.id, newNote ) );

    }
}

export const activeTask = ( id, tasks ) => ({
    type: types.taskActive,
    payload: {
        id,
        ...tasks
    }
});

export const addNewTask = ( id, task ) => ({
    type: types.taskAddNew,
    payload: {
        id, ...task
    }
})

export const startLoadingTasks= ( uid ) => {
    return async( dispatch ) => {
        const tasks = await loadTasks( uid );
        dispatch( setTasks( tasks ) );

    }
}

export const setTasks = ( tasks ) => ({
    type: types.taskLoad,
    payload: tasks
});

export const startSaveTask = ( task ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if ( !task.url ){
            delete task.url;
        }

        const taskToFirestore = { ...task };
        delete taskToFirestore.id;

        await db.doc(`${ uid }/jurnal/notes/${ task.id }`).update( taskToFirestore );

        dispatch(startLoadingTasks(uid));
        Swal.fire('Saved', task.title, 'success');
        {
            Swal.fire({
                position: 'center',
                icon: 'success',
                allowOutsideClick: false,
                title: 'Los cambios se han guardado',
                showConfirmButton: false,
                timer: 1000
            })
        }
    }
}

export const refreshTask = ( id, tasks ) => ({
    type: types.taskUpdated,
    payload: {
        id,
        tasks: {
            id,
            ...tasks
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {

        const { active:activeTask} = getState().tasks;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

        const fileUrl = await fileUpload( file );
        console.log(fileUrl)
        activeTask.url = fileUrl;
        dispatch(startSaveTask( activeTask ))
        Swal.close();

    }
}

export const startDeleting = ( id ) => {
    return async( dispatch, getState ) => {
        const uid = getState().auth.uid;
        await db.doc(`${ uid }/jurnal/notes/${ id }`).delete();

        dispatch( deleteTask(id) );

    }
}

export const deleteTask = (id) => ({
    type: types.taskDelete,
    payload: id
});

export const taskLogout = () => ({
    type: types.taskLogoutCleaning
});
