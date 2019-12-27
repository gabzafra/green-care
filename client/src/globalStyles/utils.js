const capitalize = (word) => word.split('').map((e,i)=>i===0?e.toUpperCase():e).join('');
export default capitalize;