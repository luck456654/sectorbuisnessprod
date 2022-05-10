import PaginationItems from './PaginationItems';
function BasePagination(props) {
  return (
    <div>
    <PaginationItems countItem={props.countItem}></PaginationItems>
    </div>
  );
}

export default BasePagination;