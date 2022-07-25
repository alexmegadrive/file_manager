//хранилище файлов
// import {treeObject} from './tree.js'

// console.log(treeObject)

//счетчик для присваивания id новым элементам
var id_counter = 1000;

//переменная для хранения id открытого файла
var openedItemId = 0;


//функция развертывания массива в дерево с <UL></UL> <LI></LI>

window.treeOpenFunc = function(event){
    var tree = document.querySelectorAll('ul a:not(:last-child)');
    for(var i = 0; i < tree.length; i++){
        tree[i].addEventListener('click', function(e) {
            var parent = e.target.parentElement;
            var classList = parent.classList;
            if(classList.contains("open")) {
                classList.remove('open');
                var opensubs = parent.querySelectorAll(':scope .open');
                for(var i = 0; i < opensubs.length; i++){
                    opensubs[i].classList.remove('open');
                }
            } else {
                classList.add('open');
            }
            e.preventDefault();
        });
    }}



//рендер и заполнение левой панели папками и файлами
    //создание элемента и развертывание в DOM

    window.treeMapElementsCreate = function(event){
        document.querySelector('.ChatMainList_Group').innerHTML = "";
    let treeObjRef = document.querySelector('.ChatMainList_Group')
    function getTree(array, level) {
        var ul = document.createElement('ul');
        array.forEach(function (element) {
            var li = document.createElement('li');
            var a = document.createElement('a')
            a.title = element.description;
            a.classList.add('treeItem')


            if (element.isFolder)                            //ДЛЯ ПАПКИ 
             {                        
            a.classList.add('treeItem_Folder');
            a.setAttribute('id',element.id)
            if (element.isFolderExpanded == true) {li.classList.add('open')} //для сохранени открытых папок при перерендере
            if (element.isActive == true) {a.classList.add('activeElement')} //для сохранения отметки активной папки (жирный шрифт) при перерендере

                                                            //Навешивание событий на клик
            a.addEventListener('click', function handleClick(event) {
                openedItemId = element.id; //запись в переменную ID открытого элемента
                console.log("открыт элемент " + openedItemId)
                element.isFolderExpanded = !element.isFolderExpanded //переключатель атрибута развернутой папки для сохранения открытости при перерендере
                let fileContentRef = document.querySelector('.main__file_content')
                                                                    //создание правой панели
                fileContentRef.innerHTML = (`<div id="editor__elem_block">          
                выбрана папка 
                <span id="editor__elem_name">${element.name}</span>
                </br>
                <input type="button" class="button_file" value="Изменить описание" onclick="changeDescription()">
                </div>`);

               element.isActive = true; //добавление метки активности
                if (element == true) a.classList.add('activeElement'); //активный элемент становится жирным
                for (let i = 0; i < treeObject.length; i++) { // а цикл убирает метки активного элемента с остальных
                    if (treeObject[i].id !== openedItemId) {
                        treeObject[i].isActive = false;
                    }
                }
                updateActiveElement(); // перерендер левой панели с учетом классов активного элемента
            });
            }
             else                                           //ДЛЯ ФАЙЛА 
              {
                a.classList.add('treeItem_File');
                a.setAttribute('id',element.id)
                 a.addEventListener('click', function handleClick(event) { 
                openedItemId = element.id; //запись в переменную ID открытого элемента
                console.log("открыт элемент " + openedItemId)
                let editorRef = document.querySelector('.main__file_content');
                let buttonFileInput = document.createElement("input");
                buttonFileInput.setAttribute("type", "button")
                editorRef.appendChild(buttonFileInput);
                                                                                    //создание правой панели
                editorRef.innerHTML = (`<div id="editor__elem_block">
                выбран файл <span id="editor__elem_name">${element.name}</span>
                </br>
                <input type="button" class="button_file" value="Изменить описание" onclick="changeDescription()">
                <button class="button_file" onclick="document.getElementById('input-file').click()">Загрузить TXT в редактор</button>
                <input type="file" class="button_file" id="input-file" style="display:none">
                </div>
                <textarea id="main_editor">${element.content}</textarea>
               
                `);

                element.isActive = true; //добавление метки активности
                if (element.isActive == true) a.classList.add('activeElement'); //активный элемент становится жирным
                for (let i = 0; i < treeObject.length; i++) { // а цикл убирает метки активного элемента с остальных
                    if (treeObject[i].id !== openedItemId) 
                    {
                        treeObject[i].isActive = false;
                    }
                }
                updateActiveElement(); // перерендер левой панели с учетом классов активного элемента
                uploadFileToEditor(); //навешивание на кнопку загрузки ТХТ файла в редактор обработчика события
                
            });

             }

            a.innerHTML = (element.name);
            li.appendChild(a);
            Array.isArray(element.children) && li.appendChild(getTree(element.children, level + 1));
            ul.appendChild(li);
        });
        return ul;
    }
    
    let data = treeObject   ;
    window.tree = function (data, root) {
        
            var r = [],
                o = {};
    
            data.forEach(function (a) {
                a.children = o[a.id] && o[a.id].children;
                o[a.id] = a;
                if (a.parent === root) {
                    r.push(a);
                } else {
                    o[a.parent] = o[a.parent] || {};
                    o[a.parent].children = o[a.parent].children || [];
                    o[a.parent].children.push(a);
                }
            });
            return r;
        }(data.sort(function (a, b) { return a.parent - b.parent || a.id- b.id; }), 0);
    
    treeObjRef.appendChild(getTree(tree));
        //конец развертывания в DOM



//вызов функции раскрывания
treeOpenFunc();
    }


//ставим метку и класс на активный элемент, убираем с остальных
const updateActiveElement = () => {
    for (let i = 0; i < treeObject.length; i++) {
        if (treeObject[i].isActive) {
            console.log('ветка 1 ' + treeObject[i].id)

            let target = document.getElementById(treeObject[i].id);
            target.classList.add('activeElement')
        } else {
            console.log('ветка 2 ' + treeObject[i].id)
            let target = document.getElementById(treeObject[i].id);
            target.classList.remove('activeElement')
        }
    }
}



//удаление элемента
const removeElement = () => {

    for (let i = 0; i < treeObject.length; i++) {     
        if (treeObject[i].id == openedItemId) {
            treeObject.splice(i,1);
        }
        document.getElementById('editor__elem_block').innerHTML = ('Выберите элемент')
        if (document.getElementById('main_editor')) {document.getElementById('main_editor').remove();}
        treeMapElementsCreate();
        // updateActiveElement();
    }
    
}


//сброс активного элемента при клике на свободное место
window.clearActiveElement = function() {
    for (let i = 0; i < treeObject.length; i++) {     
        treeObject[i].isActive = false;
    }
    console.log("сброс выполнен")
    document.getElementById('editor__elem_block').innerHTML = ('Выберите элемент');
    
    if (document.getElementById('main_editor')) {document.getElementById('main_editor').remove();}
    openedItemId = 0;
    updateActiveElement();
}

//создание файла

window.addFile = function(newFileName){
    event.preventDefault();
    const target = treeObject.findIndex((element) => element.id == openedItemId);
    if (!!newFileName && ((openedItemId == 0) || (treeObject[target].isFolder == true))) {
        document.querySelector('#addForm_newName').value = "";
        treeObject.push({
            id: id_counter,
            name: newFileName,
            isFolder: false,
            content: "",
            isActive: false,
            description: "",
            parent: openedItemId,

        })
        console.log('добавлено c номером ' + id_counter)
        console.log(treeObject)
        treeMapElementsCreate();
        id_counter++;
    } }


//создание папки
window.addFolder = function(newFolderName) {
    event.preventDefault();
    const target = treeObject.findIndex((element) => element.id == openedItemId);
    if (!!newFolderName && ((openedItemId == 0) || (treeObject[target].isFolder == true))) {
        document.querySelector('#addForm_newName').value = "";
        treeObject.push({
            id: id_counter,
            name: newFolderName,
            isFolder: true,
            isActive: false,
            isFolderExpanded: false,
            description: "",
            parent: openedItemId,
        })
        console.log('добавлено c номером ' + id_counter);
        console.log(treeObject);
        treeMapElementsCreate();
        id_counter++;
    }
}

// загрузка файла в редактор
const uploadFileToEditor = () => {
    console.log('1')

const targetEl = treeObject.findIndex((element) => element.id == openedItemId);
    
if ( (openedItemId !== 0) && (treeObject[targetEl].isFolder == false)) {
    document.getElementById('input-file').addEventListener('change', getFile)
  
  function getFile(event) {
       const input = event.target;
    if ('files' in input && input.files.length > 0) {
        placeFileContent(
        document.getElementById('main_editor'),
        input.files[0])
    }
  }
  
  function placeFileContent(target, file) {
      readFileContent(file).then(content => {
        target.value = content
    }).catch(error => console.log(error))
  }
  
  function readFileContent(file) {
      const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result)
      reader.onerror = error => reject(error)
      reader.readAsText(file)
    })
  }
}
}




//сохранение содержимого редактора в файл
const saveFile = () => {
    let editor_content = document.querySelector('#main_editor').value;
    console.log(editor_content);
    console.log("запись в файл с Id " + openedItemId)
    for (let i = 0; i < treeObject.length; i++) {
        if (treeObject[i].id == openedItemId) {
            treeObject[i].content = editor_content;
            console.log("Сохранено");
            alert("Сохранено");
        }
    }
    updateActiveElement();
};


// переименование файла
const changeElementName = () => {

    if (openedItemId !== 0)    {
    let newName = prompt('Введите новое имя элемента')
    if (!!newName) {
        for (let i = 0; i < treeObject.length; i++) {
            if (treeObject[i].id == openedItemId) {
                treeObject[i].name = newName;
                console.log("Сохранено")
            }
        }
        document.querySelector('#editor__elem_name').innerHTML = newName;
        treeMapElementsCreate(); //перерендер с учетом обновленного названия
        updateActiveElement();
    }
}
};


// изменение описания
const changeDescription = () => {
    let newDesc = prompt('Введите новое описание элемента')
    if (!!newDesc) {
        for (let i = 0; i < treeObject.length; i++) {
            if (treeObject[i].id == openedItemId) {
                treeObject[i].description = newDesc;
                console.log("Сохранено")
            }
        }
        document.querySelector('#editor__elem_name').title = newDesc;
        treeMapElementsCreate(); //перерендер с учетом обновленного названия
        updateActiveElement();
    }
};

//функция скачивания файла
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

const downloadFile = () => {
    const target = treeObject.findIndex((element) => element.id == openedItemId);

    download(treeObject[target].name + '.txt',document.getElementById('main_editor').value);
}


// создание дерева элементов при первой загрузке
treeMapElementsCreate();



