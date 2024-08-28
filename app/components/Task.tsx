"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from './modal';
import { useRouter } from "next/navigation";
import { editTodo, deleteTodo } from "@/api";

interface TaskProps{
    task : ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const router = useRouter();
    const[openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const[openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault();
        await editTodo({
            id : task.id,
            text: taskToEdit,
        });
        setOpenModalEdit(false);
        router.refresh();
    };
    async function handleDeleteTask(id:string){
        await deleteTodo(id);
        setOpenModalDelete(false);
        router.refresh();
    }
  return (
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25} />
                    <Modal modalOpen =  {openModalEdit} setModalOpen={ setOpenModalEdit}>
                        <form onSubmit={handleSubmitEditTodo}>
                            <h3 className="font-bold text-lg">Modifier une tache</h3>
                            <div className="modal-action">
                                <input 
                                value={taskToEdit}onChange={e => setTaskToEdit(e.target.value)}
                                type="text" placeholder="Ecrivez ici" className="input input-bordered w-full" />
                                <button className="btn" type="submit">Enregistrer</button>
                            </div>
                        </form>
                    </Modal>
                <FiTrash2 onClick={() => setOpenModalDelete(true)}cursor="pointer"  className="text-red-500" size={25} />
                <Modal modalOpen =  {openModalDelete} setModalOpen={setOpenModalDelete}>
                        <form onSubmit={handleSubmitEditTodo}>
                            <h3 className="font-bold text-lg">Suppression de tâche</h3>
                            <div className="modal-action">
                                <h3 className="font-bold text-lg text-danger">Voulez vous vraiment supprimer cette tâche? </h3>
                                <div className="modal-action"><button className="btn" onClick={() => handleDeleteTask(task.id)}>Valider</button></div>
                            </div>
                        </form>
                    </Modal>
            </td>
        </tr>
  );
}

export default Task;