const PhoneList = ({list, onClick}) => {
  const return_list = []
  for (let i=0;i<list.length; i++){ return_list.push(
  <li key={list[i].id}>{list[i].name}: {list[i].number}
  <button onClick={()=>onClick(list[i].id)}>Delete</button>
  </li>) }
  return (return_list);
}

export default PhoneList