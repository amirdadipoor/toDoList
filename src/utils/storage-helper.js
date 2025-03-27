
class StorageHelper {
    storageName = "ApplicationStorage";

    getTasksFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(this.storageName)) || [] ;
    }

    saveTaskToLocalStorage = (data = []) => {
        localStorage.setItem(this.storageName, JSON.stringify(data));
    }

}

export default new StorageHelper();