// variable for delete button //
const deleteBtn = document.querySelectorAll('.fa-trash')
// variable for all elements of a certain class item inside queryselector//
const item = document.querySelectorAll('.item span')
// variable for completed span  //
const itemCompleted = document.querySelectorAll('.item span.completed')

// array  for deleted elements, add event listener //
Array.from(deleteBtn).forEach((element)=>
// add event listener to delete button, add event listener //
{
    element.addEventListener('click', deleteItem)
})


//array for uncompleted items, add eventlistener //
Array.from(item).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

// array for completed items, add event listener //
Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markUnComplete)
})

// async function deleteItem() //
async function deleteItem()
// event delegation for the delete function
// selecting the text of the item //
{
    const itemText = this.parentNode.childNodes[1].innerText
    // try to  wait for the request to be sent //
    try{
        // store response in the variable  //
        const response = await fetch('deleteItem', {
            method: 'delete',
            // data converts to json //
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
          // response for server //
        const data = await response.json()
        console.log(data)
        // refresh the page //
        location.reload()
     // catch error //     
    }catch(err){
        console.log(err)
    }
}

// asynce function markComplete() //
async function markComplete(){
    // selct the text of the item //
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        // store response in the variable, to  mark  complete   //
        const response = await fetch('markComplete', {
           // put method //
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
          // response for server //
        const data = await response.json()
        console.log(data)
        // refresh the page //
        location.reload()
          // catch error //
    }catch(err){
        console.log(err)
    }
}

// asynce function markUnComplete() //
async function markUnComplete(){
    // selct the text of the item //
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        // store response in the variable, to  mark  uncomplete   //
        const response = await fetch('markUnComplete', {
            // put method //
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
            // response for server //
        const data = await response.json()
        console.log(data)
        // refresh the page //
        location.reload()
// catch error //
    }catch(err){
        console.log(err)
    }
}