function Tabletr(props) {
  return (
    <tr className="Tabletr">
    <td className='container__td'>{props.id}</td>
    <td className='container__td container__content-title'>{props.title}</td>
    <td className='container__td container__content-body'>{props.body}</td>
    </tr>
  );
}

export default Tabletr;