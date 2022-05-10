import '../components/Style.css';
import { setPages } from '../store/actions'
import React from "react";
import { useDispatch, useSelector } from 'react-redux'

function PaginationItems(props) {

  let items = [];

  const data = useSelector(state => state)
  const dispatch = useDispatch();

  for (let i = 1; data?.setpage.count >= i; i++) {
    items.push(<div className="link" >{i}</div>)
  }

  return (
    <div className='pagination'>
      {items.map((item) => (
        <div
          id={item?.props.children}
          className={(item?.props.children == data?.setpage.page) ? "activePage" : null}
          onClick={() => dispatch((setPages(item?.props.children, data?.setpage.count)))}>{item}</div>
      ))}
    </div>
  );
}
export default PaginationItems

