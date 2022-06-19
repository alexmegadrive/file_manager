const treeObject = [

    {
        id: 1,
        parent: 0,
        name: 'File2.txt',
        isFolder: false,
        content: "let treeObjRef = document.querySelector('.ChatMainList_Group') \nlet newElement = document.createElement(div);",
        description: "test desc File2 файл 2 описание",
        isActive: false
    },
    {
        id: 7,
        parent: 0,
        name: 'File3.doc',
        isFolder: false,
        content: "File3 : 333 333 333\nlet newElement = document.createElement(div);\n <div class=header__icon-settings_delete></div>",
        description: "test desc file 3333 рабочие материалы",
        isActive: false
    },
    {
        id: 2,
        parent: 0,
        name: 'folder2_дочерние файлы',
        description: "это папка folder#2",
        isFolder: true,
        isActive: false,
        isFolderExpanded: false

    },
    {
        id: 3,
        parent: 0,
        name: 'folder5',
        description: "это папка Folder#5",
        isFolder: true,
        children: [],
        isActive: false,
        isFolderExpanded: false
    },
    {
        id: 4,
        parent: 2,
        name: 'TestFile',
        description: "test desc",
        isFolder: false,
        content: "1111111111",
        isActive: false
    },
    {
        id: 5,
        parent: 2,
        name: 'TestFile2',
        description: "test desc",
        isFolder: false,
        content: "2222222222222",
        isActive: false
    },
    {
        id: 6,
        parent: 2,
        name: 'TestFile3',
        description: "test desc",
        isFolder: false,
        content: "33333333",
        isActive: false
    },
    {
        id: 101,
        parent: 2,
        name: 'folder6_inner',
        description: "это папка Folder#6 inner",
        isFolder: true,
        children: [],
        isActive: false,
        isFolderExpanded: false
    },
    {
        id: 102,
        parent: 101,
        name: 'TestFile Folder 6 inner',
        description: "test desc",
        isFolder: false,
        content: "",
        isActive: false
    },
];


export {treeObject};