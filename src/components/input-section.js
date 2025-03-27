import Swal from 'sweetalert2'
import { EventBus } from './event-bus.js';

class InputSection {

    createNewTaskCallBack;

    /*constructor(options) {
        this.createNewTaskCallBack = options.createNewTaskCallBack;
    }*/

    createHeadingTag() {
        const heading = document.createElement("h1");
        const class_list = ["text-2xl" ,"font-bold" ,"text-center" ,"mb-4"]
        heading.classList.add(...class_list);
        heading.innerText = "Todo List";
        return heading;
    }

    createInput() {
        const input = document.createElement("input");
        const class_list = ["border" ,"p-2","flex-1","rounded-l-md","focus:outline-none","focus:ring-2","focus:ring-blue-500"]
        input.id = "todo-input";
        input.type = "text";
        input.placeholder = "Add New Task";
        input.classList.add(...class_list);
        return input;
    }

    createButton() {
        const button = document.createElement("button");
        const class_list = ["bg-blue-500","text-white","px-4","py-2","rounded-r-md","hover:bg-blue-600"];
        button.id = "add-btn";
        //button.type = "button";
        button.classList.add(...class_list);
        button.innerText = "Add";
        return button;
    }

    handleClickEventButtonCreateNewItem = (event , inputTodoText) => {
        let todoText = inputTodoText.value.trim() ;
        if ((typeof todoText === "string" && todoText.length === 0) || todoText === null )  {
            // show error to user Enter valid data
            this.showInvalidTaskInputError();
            return false;
        }
        EventBus.dispatchEvent(new CustomEvent('newItemAdded' , { detail: { todoText } }));
        inputTodoText.value = "";

    }

    showInvalidTaskInputError() {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter valid task name & try again  !",
            timerProgressBar: true,
            showCloseButton: true,
            timer: 3000,
        });
    }

    render() {
        const h1 = this.createHeadingTag();
        const element = document.createElement("div");
        element.classList.add("flex","mb-4");


        let input = this.createInput();
        let button = this.createButton();

        button.addEventListener("click", (e) => this.handleClickEventButtonCreateNewItem(e , input));

        element.appendChild(input);
        element.appendChild(button);
        return [h1, element];
    }
}

export default new InputSection();