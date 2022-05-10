import { setPages } from './store/actions'
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import './components/Normalize.css';
import './components/Style.css';
import Tabletr from './components/Tabletr.js'
import BasePagination from './components/BasePagination.js'
import { useDispatch, useSelector } from 'react-redux'
const url = "https://jsonplaceholder.typicode.com/posts ";

function App(props) {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [productsCurrent, setProductsCurrent] = useState([]);
  const [count, setCount] = useState();
  const perpage = 10;
  const storeData = useSelector(state => state)
  const dispatch = useDispatch()
  const [titles, setTitles] = useState();
  const [bodys, setBodys] = useState();
  const [idx, setId] = useState()
  const [value, setValue] = useState('');
  const [temp, setTemp] = useState()
  useEffect(() => {
    loadContent();
  }, []);

  useEffect(() => {
    goPage(storeData?.setpage.page)
  }, [storeData?.setpage.page]);

  useEffect(() => {
    if (temp == 'sortTitle') {
      sortTitle()
    }
  }, [temp]);

  useEffect(() => {
    if (temp == 'sortBody') {
      sortBody()
    }
  }, [temp]);

  useEffect(() => {
    if (temp == 'sortIdx') {
      sortId()
    }
  }, [temp]);

  useEffect(() => {
    setTimeout(search(value),4000) 
  }, [value]);

  function loadContent() {

    axios
      .get(url)
      .then((res) => {
        setContent(res.data)
        ProductList(res.data, 1);
        setCount(res.data.length / perpage)
        dispatch((setPages(page, res.data.length / perpage)))
      })

  }
  function ProductList(cont, currentPage) {
    let offset = (currentPage - 1) * perpage;
    setProductsCurrent(cont.slice(offset, offset + perpage));

  }
  function goPage(page) {
    let currentPage = page
    ProductList(content, currentPage)
    setPage(currentPage)
  }
  function nextPage() {
    let currentPage = page + 1
    ProductList(content, currentPage)
    setPage(currentPage)
    dispatch((setPages(currentPage, storeData?.setpage.count)))
  }
  function prevPage() {
    let currentPage = page - 1
    ProductList(content, currentPage)
    setPage(currentPage)
    dispatch((setPages(currentPage, storeData?.setpage.count)))
  }
  function sortTitle() {
    setTemp('sortTitle')
    setProductsCurrent([])
    let titles = content
    function SortArray(x, y) {


      if (x.title < y.title) { return -1; }
      if (x.title > y.title) { return 1; }
      return 0;
    }
    let sortTitles2 = titles.sort(SortArray);
    setProductsCurrent(sortTitles2)
    setTitles(sortTitles2)
    let currentPage = storeData?.setpage.page
    ProductList(content, currentPage)
    setPage(currentPage)

  }
  function sortBody() {
    let bodys = content
    setTemp('sortBody')
    function SortArray2(x, y) {
      if (x.body < y.body) { return -1; }
      if (x.body > y.body) { return 1; }
      return 0;
    }
    let sortBody2 = bodys.sort(SortArray2);
    setProductsCurrent(sortBody2)
    setBodys(sortBody2)
    let currentPage = storeData?.setpage.page
    ProductList(content, currentPage)
    setPage(currentPage)

  }
  function sortId() {
    setTemp('sortIdx')
    setProductsCurrent([])
    let id = content
    function SortArray3(x, y) {

      if (x.id > y.id) { return -1; }
      if (x.id < y.id) { return 1; }
      return 0;
    }
    let sortId2 = id.sort(SortArray3);
    setProductsCurrent(sortId2)
    setId(sortId2)
    let currentPage = storeData?.setpage.page
    ProductList(content, currentPage)
    setPage(currentPage)
  }
  function search(value) {
    
    let i = 0;
    let sost = 0
    let sostBody = 0
    let sostText=0
    let findInTittle=0
    let findInBody=0
    let n=0
   
    content?.map(item => {
      if (sost == 0) {
         findInTittle = item.title.indexOf(value)
        if (findInTittle > -1) {
          console.log('нашел')
          sost = 1
         return sostText=n
        }
        else {
          console.log('не нашел')
           findInBody = item.body.indexOf(value)
          if (sostBody == 0){
            if (findInBody > -1) {
             console.log('нашел body')
           
             sostBody = 1
             return sostText=n
            }
            else {
              console.log('не нашел в body')
            }
          }
        }
      }
    n=n+1 
   })
  if(sostText!=0){
    let productsArr = productsCurrent
    let productsCur=productsArr.splice(sostText,1)
    setProductsCurrent(productsCur)
   }

  }
  function handleChange(event){
    setValue(event.target.value)
  }
  return (<div>
    <div className="container">
           <div className="search" >
        <input className="search-field" placeholder="Поиск" value={value} onChange={handleChange}></input>
        <svg className="search-icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.7353 19.4958L14.7101 13.4663C15.8979 12.0418 16.6124 10.2213 16.6124 8.23301C16.6124 3.69689 12.8896 0.00860596 8.31048 0.00860596C3.73132 0.00860596 0 3.70119 0 8.23731C0 12.7734 3.72272 16.4617 8.30187 16.4617C10.2472 16.4617 12.0375 15.7946 13.4577 14.68L19.5045 20.7267C19.8574 21.0796 20.3824 21.0796 20.7353 20.7267C21.0882 20.3738 21.0882 19.8487 20.7353 19.4958ZM1.76452 8.23731C1.76452 4.67383 4.69966 1.77743 8.30187 1.77743C11.9041 1.77743 14.8392 4.67383 14.8392 8.23731C14.8392 11.8008 11.9041 14.6972 8.30187 14.6972C4.69966 14.6972 1.76452 11.7965 1.76452 8.23731Z" fill="white" />
        </svg>
        
      </div>

      <table className="container__table">
        <th className='container__tr' onClick={sortId}>
          <span>ID</span>
          <svg className='container__svg-id' width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
            <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
          </svg>
        </th>
        <th className='container__th container__title' onClick={sortTitle}><span className='title'>Заголовок</span>
          <svg className='container__svg-title' width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
            <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
          </svg>
        </th>
        <th className='container__desc'><span className='desc' onClick={sortBody}>Описание</span>
          <svg className='container__svg' width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC" />
            <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white" />
          </svg>
        </th>
        {productsCurrent.map((item) => (
          <Tabletr id={item.id} title={item.title} body={item.body} ></Tabletr>
        ))}
      </table>
      <div className="container__form">
        <a className='button' onClick={prevPage}>Назад</a>
        <BasePagination countItem={count} page={page}></BasePagination>
        <a className='button' onClick={nextPage}>Далее</a>
      </div>

    </div>





  </div>

  )
}


export default App