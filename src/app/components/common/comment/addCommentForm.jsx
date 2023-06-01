import React, { useEffect, useState } from "react";
import api from "../../../API";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({
        userId: "",
        content: ""
    });
    const [users, setUsers] = useState({});
    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log([target.name]);
    };
    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Выберите от чьего имени вы хотите отправить сообщение"
            }
        },
        content: {
            isRequired: {
                message: "Сщщбщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);
    const clearForm = () => {
        setData({ userId: "", content: "" });
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };
    const userList =
        users &&
        Object.keys(users).map((userName) => ({
            label: users[userName].name,
            value: users[userName]._id
        }));
    console.log(userList);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SelectField
                    defaultOption="Выберите пользователя"
                    options={userList}
                    name="value"
                    onChange={handleChange}
                    value={users.userId}
                    error={errors.userId}
                />
                <TextAreaField
                    value={data.content}
                    onChange={handleChange}
                    name="content"
                    label="Сообщение"
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button
                        className="
                                                                btn btn-primary
                                                                mt-4
                                                            "
                    >
                        Опубликовать
                    </button>
                </div>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
