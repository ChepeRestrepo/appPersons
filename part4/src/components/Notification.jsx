import style from "./Notificacion.module.css";
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className={message === null ? style.success : style.danger}>
      {message}
    </div>
  );
};

export default Notification;
