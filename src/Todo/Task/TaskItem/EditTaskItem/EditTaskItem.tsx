import React from "react";
import {useDispatch} from "react-redux";
import {editTask} from "../../../../Store/listReducer";
import s from "./style.module.css";
// @ts-ignore
import DatePicker from "react-datepicker";
import {Field, Form, Formik} from "formik";

type EditModeType = {
    task: TaskType
    setEditMode: (e: boolean) => void
    currentPage: number
}

type TaskType = {
    title: string
    description: string
    startDate: string
    deadline: string
    priority: number
    todoListId: string
    id: string
    status: number
    addedDate: string
}

export const TaskEditMode: React.FC<EditModeType> = ({ task, setEditMode,  currentPage}) => {
    const {title, description, startDate, deadline, priority, addedDate, status, todoListId, id} = task;
    const dispatch = useDispatch()

    const submit = (values: TaskType) => {
        dispatch(editTask(values, todoListId, id, 5, currentPage))
        setEditMode(false)
    }

    return <div>
        <div className={s.addTaskWindow}>
            <div>
                <div className={s.taskBanner}>
                    Edit Task
                </div>
                <div className={s.form}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            ...task,
                            title: title,
                            description: description,
                            priority: priority,
                            startDate: startDate,
                            deadline: deadline,

                        } as const}
                        onSubmit={submit}
                    >
                        {({
                              isSubmitting,
                              values,
                              errors,
                              setFieldValue,
                              handleChange
                          }) => (
                            <Form>
                                <Field className={s.title} placeholder="Task title" type="text" name="title"/>
                                <div className={s.descriptionField}>
                                    <Field className={s.description} placeholder="Description" type="text" name="description"/>
                                </div>
                                <div className={s.block}>
                                    Priority:
                                    <select onChange={handleChange} value={values.priority} name='priority'>
                                        <option value='0'>low</option>
                                        <option value='1'>medium</option>
                                        <option value='2'>high</option>
                                        <option value='3'>very high</option>
                                    </select>
                                    <div className={s.datePickers}>
                                        Start:
                                        <DatePickerField
                                            name='startDate'
                                            value={values.startDate}
                                            onChange={setFieldValue}
                                        />
                                        Deadline:
                                        <DatePickerField
                                            name='deadline'
                                            value={values.deadline}
                                            onChange={setFieldValue}
                                        />
                                    </div>
                                </div>
                                <button className={s.submitButton} type="submit">
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className={s.closeBar}>
                    <div className={s.closeButton} onClick={() => setEditMode(false)}> </div>
                </div>
            </div>

        </div>
    </div>
}



type DatePickerPropsType = {
    name: string
    value: string | Date
    onChange: (e: string, v: string | Date) => void
}

const DatePickerField: React.FC<DatePickerPropsType> = ({ name, value, onChange }) => {
    return (
        <DatePicker className={s.datePicker}
                    selected={(value && new Date(value)) || null}
                    onChange={(val: any) => {
                        onChange(name, val);
                    }}
        />
    );
};