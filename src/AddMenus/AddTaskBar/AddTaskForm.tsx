import React, {useEffect} from 'react';
import s from './style.module.css';
// @ts-ignore
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Field, Form, Formik} from 'formik';
// @ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {addNewTask, TaskType} from "../../Store/listReducer";

type TaskFormPropsType = {
    setAddMode: (e: boolean) => void
}


export const AddTaskForm: React.FC<TaskFormPropsType> = ({setAddMode}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const validate = (v: any) => {
        const errors: any = {};
        if(v.title.length > 70){
            errors.title = 'Title must be no more than 70 symbols!'
        }if(v.description.length > 250){
            errors.description = 'Description must be no more than 250 symbols!'
        }
        return errors;
    }

    useEffect(() => {
        setAddMode(true)
    }, [])

    const closeMenu = () => {
        setAddMode(false)
        const paramURI = history.location
        history.push({...paramURI, pathname: '/tasks'})
    }

    const submit = (values: TaskType) => {
        const selectListId = history.location.search.substring(1)
        dispatch(addNewTask(values, selectListId))
        closeMenu()
    }

    return <div>
        <div className={s.addTaskWindow}>
            <div>
                <div className={s.taskBanner}>
                    Create a new task ?
                </div>
                <div className={s.form}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            title: '',
                            description: '',
                            priority: '0',
                            startDate: new Date(),
                            deadline: new Date(),
                            addedDate: new Date(),
                        } as any}
                        validate={(val) => validate(val)}
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
                                <div className={s.titleErrorsBlock}>
                                    <Field className={s.title} placeholder="Task title" type="text" name="title"/>
                                    {errors.title || errors.description ?
                                        <div className={s.errorsBlock}>
                                            <div>{errors.title}</div>
                                            <div>{errors.description}</div>
                                        </div> :
                                        null
                                    }

                                </div>
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
                    <div className={s.closeButton} onClick={closeMenu}> </div>
                </div>
            </div>

        </div>
    </div>
}


const DatePickerField = ({ name, value, onChange }: any) => {
    return (
        <DatePicker className={s.datePicker}
            selected={(value && new Date(value)) || null}
            onChange={(val: TaskType) => {
                onChange(name, val);
            }}
        />
    );
};
