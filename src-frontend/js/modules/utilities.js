export let units = ["n", "u", "g", "ml"];

export function findNameByID(data, id) {
    const result = data.find(item => item.id == id);
    return result ? result.name : null;  // Return the id if found, otherwise return null
}

export function findIdByName(data, name) {
    const result = data.find(item => item.name == name);
    return result ? result.id : null;  // Return the id if found, otherwise return null
}

export function findObject(data, id) {
    const result = data.find(item => item.id == id);
    return result ? result : null;  // Return the id if found, otherwise return null
}

export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const day = String(today.getDate()).padStart(2, '0');
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

export function splitDateTime(dateTimeStr) {
    // Split the string by space into date and time parts
    const [date, time] = dateTimeStr.split(' ');

    // Return the date and time as an array
    return [date, time];
}