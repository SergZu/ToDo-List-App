export const formatDate = (date : Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return [`${days[ date.getDay() ]} ${months[ date.getMonth() ]} ${date.getDate()}`, `${hours < 10 ? '0' + hours : hours} : ${minutes < 10 ? '0' + minutes : minutes} `]
};

export const convertDate = (ms : number) => {
    const date = new Date(ms);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month < 9 ? '0' + (month + 1) : (month + 1) }-${day < 10 ? '0' + day : day}T${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes}`;
};
    
export const computeTimeDiff = (ms : number) => {
    const diff = ms - Date.now();
    const minute = 60000;
    const hour = 3600000;
    const day = 86400000;
    if (diff < 0) return 'expired';
    if (diff < hour) return `${Math.floor(diff / minute)} min`;
    if ( (diff > hour) && (diff < day) ) return `${Math.floor(diff / hour)}h : ${Math.floor( (diff % hour) / minute )}m`;
    return `${Math.floor(diff / day)} days`;
};