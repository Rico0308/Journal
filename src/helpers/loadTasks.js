import { db } from '../firebase/firebase-config';

export const loadTasks= async ( uid ) => {

    const tasksSnap = await db.collection(`${ uid }/jurnal/notes`).get();
    const tasks = [];

    tasksSnap.forEach( snapHijo => {
        tasks.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });
    return tasks;
}

export const loadSearch = async(search, uid) => {
    const respuesta = await db.collection(`${uid}/jurnal/notes`).where("title", "==", search).get();
    const tasks = [];

    respuesta.forEach(task => {
        tasks.push({
            id: task.id,
            ...task.data()
        })
    });
    return tasks;
}



