import StorageHelper from './../utils/storage-helper.js';
class ListSection {

    // deprecated
    createEditTaskButton() {
        let button = document.createElement("button");
        let classList = ["ml-2","text-blue-500","hover:text-blue-700"]
        button.classList.add(...classList)
        button.innerText = "✏️";
        return button;
    }

    // deprecated
    createDeleteTaskButton() {
        let button = document.createElement("button");
        let classList = ["ml-2","text-blue-500","hover:text-blue-700"]
        button.classList.add(...classList)
        button.innerText = "❌";
        return button;
    }

    createActionButton(textButton) {
        let button = document.createElement("button");
        let classList = ["ml-2","text-blue-500","hover:text-blue-700"]
        button.classList.add(...classList)
        button.innerText = textButton;
        return button;
    }

    createSpanLabelItem(taskName , taskStatus) {
        let span = document.createElement("span");
        span.className = taskStatus ? "flex-1 cursor-pointer line-through text-gray-500" : "flex-1 cursor-pointer";
        span.innerText = taskName;
        return span;
    }

    createCheckBoxElement(taskStatus) {
        let checkbox = document.createElement('checkbox');
        checkbox.className = "mr-2";
        checkbox.type = "checkbox";
        taskStatus ? checkbox.checked = true : checkbox.checked = false;
        return checkbox;
    }

    createListItemElement(taskName , taskState) {
        let listItem = document.createElement('li');
        listItem.className = "flex items-center bg-gray-200 p-2 rounded";

        // define element
        let myCheckbox = this.createCheckBoxElement( taskState);
        let mySpan = this.createSpanLabelItem(taskName , taskState);
        let editButton = this.createActionButton("✏️");
        let deleteButton  = this.createActionButton("❌");

        // define event listeners
        myCheckbox.addEventListener("change" , (e) => this.checkBoxToggleEventListener(e));
        editButton.addEventListener("click" , (e) => this.editButtonClickEventListener(e));
        deleteButton.addEventListener("click" , (e) => this.deleteButtonClickEventListener(e));

        // add elements to list items
        listItem.appendChild(myCheckbox);
        listItem.appendChild(mySpan);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        return listItem;
    }

    checkBoxToggleEventListener = (event) => {
        console.log("CheckBox event", event);
    }

    editButtonClickEventListener = (event) => {
        console.log("EditButton event", event);
    }

    deleteButtonClickEventListener = (event) => {
        console.log("DeleteButton event", event);
    }

    render() {
        const list = document.createElement("ul");
        list.id = "todo-list";
        list.classList.add("space-y-2");
        let tasksList = StorageHelper.getTasksFromLocalStorage();
        tasksList.forEach((item) => list.appendChild(this.createListItemElement(item.task , item.done)));

        console.log(tasksList)

        return list;
    }
}


export default new ListSection();