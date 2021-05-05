import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

const schema = yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    desc: yup.string()
})


export const Modal = ({ onSubmit, onCloseForm, usrObj }) => {
  const param = {
    resolver: yupResolver(schema),
    defaultValues: usrObj
  }
  const { register, handleSubmit, formState: {errors} } = useForm(param);
  return (
    <div className="overlay modal__add">
      <div className="modal-content">
        <h5>Create new user</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-field">
            <input {...register("name")} type="text" placeholder="Name" />
            <p>{errors.name?.message}</p>
          </div>
          <div className="input-field">
            <input {...register("surname")} type="text" placeholder="Surname" />
            <p>{errors.surname?.message}</p>
          </div>
          <div className="input-field">
            <input {...register("desc")} type="text" placeholder="Description" />
            <p>{errors.desc?.message}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={onCloseForm}
              className="waves-effect red waves-red btn left">Close
            </button>
            {
              usrObj
              ? <button type="submit" className="waves-effect waves-green btn right">Edit</button>
              : <button type="submit" className="waves-effect waves-green btn right">Add</button>
            }           
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCloseForm: PropTypes.func.isRequired,
  usrObj: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      surname: PropTypes.string,
      desc: PropTypes.string
    })])
}