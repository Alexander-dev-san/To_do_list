let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
let valueInput = '';
let input = null;

window.onload = function addElement() {
  input = document.getElementById('add-task');
  input.addEventListener('change', updateValue);
  render();
  
}

onClickButton = () => {
  allTasks.push({
    text: valueInput,
    isCheck: false
  });
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  valueInput = '';
  input.value = '';
  render();
}

onClearButton = () => {
  localStorage.clear();
  allTasks = [];
  render();
}

onDeleteKey = () => {
  localStorage.removeItem(localStorage.key(1));
}

// выводим значения с input в консоль после изменения и потери фокуса
updateValue = (event) => {
  valueInput = event.target.value;
}

render = () => {
  const content = document.getElementById('content-page');
  const contentYes = document.getElementById('content-page_yes');
  while(content.firstChild) {
    content.removeChild(content.firstChild)
  }
  while(contentYes.firstChild) {
    contentYes.removeChild(contentYes.firstChild)
  }
  // allTasks.sort((a, b) => {
  //   return a.isCheck - b.isCheck
  // });
  allTasks.map((item, index) => {

    const container = document.createElement('div');
    container.id = `task-${index}`;
    container.className = 'task-container';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox'
    checkbox.checked = item.isCheck;
    checkbox.onchange = function () {
      onChangeCheckbox(index);
    };
    container.appendChild(checkbox);
    const text = document.createElement('p');
    text.innerText = item.text;
    text.className = item.isCheck ? 'text-task done-text' : 'text-task';
    container.appendChild(text);

    const imgEdit = document.createElement('img');
    imgEdit.src = 'img/edit.svg';
    imgEdit.className = 'edit';
    container.appendChild(imgEdit);
    imgEdit.onclick = function() {
      let inpText = item.text + '';
      console.log(typeof(inpText));
      text.outerHTML = `<input id='inputText${index}' class='inputText' maxlength="40">`;
      console.log(item.text);
      let inputText = document.getElementById(`inputText${index}`);
      inputText.value = item.text;
      inputText.focus();
      inputText.addEventListener('focusout', function() {
        item.text = inputText.value;
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        render();
      });
      imgEdit.outerHTML = `<img src='img/done.svg' class='edit imgDone'>`;
      const imgDone = document.getElementsByClassName('imgDone')[0];
      imgDone.onclick = function() {
        if(inputText){
          item.text = inputText.value;
        } else {
          item.text = '';
        }
        localStorage.setItem('tasks', JSON.stringify(allTasks));
        render();
      }
    }

    const imgDelete = document.createElement('img');
    imgDelete.src = 'img/delete.svg';
    imgDelete.className = 'edit';
    container.appendChild(imgDelete);
    imgDelete.onclick = function(){
      onDeleteContainer(index);
    }

    if(!item.isCheck){
      content.appendChild(container);
    } else {
      contentYes.appendChild(container);
    }
    
  });
}

onChangeCheckbox = (index) => {
  allTasks[index].isCheck = !allTasks[index].isCheck;
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

onDeleteContainer = (index) => {
  delete allTasks[index];
  allTasks = allTasks.filter(function(val){return val});
  localStorage.setItem('tasks', JSON.stringify(allTasks));
  render();
}

// onEditContainer = (index, item) => {
//   
// }

// let inputText = document.createElement('input');
      // inputText.value = item.text;
      // imgDelete.remove();
      // imgEdit.remove();
      // container.appendChild(inputText);