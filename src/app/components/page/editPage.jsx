import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import api from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import {
    useHistory,
    useParams
} from "react-router-dom/cjs/react-router-dom.min";

const EditPage = () => {
    const params = useParams();
    const id = params.userId;
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    const [data, setData] = useState({
        profession: "",
        qualities: []
    });
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleClick = () => {
        history.goBack();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const { profession, qualities } = data;
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    // function qualitie() {
    //     if (data.qualities === qualities) {
    //         return data.qualities.map((q) => q.name);
    //     }
    // }
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.users.update(id, user).then((data) => setData(data));
    }, [user]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {user ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                options={professions}
                                onChange={handleChange}
                                defaultOption={user.profession.name}
                                name="profession"
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            {console.log(
                                getQualities(data.qualities).map((q) => q.name)
                            )}
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                onClick={handleClick}
                                className="btn btn-primary w-100 mx-auto"
                                type="submit"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <h1>Loading</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditPage;
