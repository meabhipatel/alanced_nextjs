export function timeAgo(postedTimeStr: string): string {
  const postedTime = new Date(postedTimeStr);
  const currentTime = new Date();

  const deltaInMilliseconds = currentTime.getTime() - postedTime.getTime();
  const deltaInSeconds = Math.floor(deltaInMilliseconds / 1000);
  const deltaInMinutes = Math.floor(deltaInSeconds / 60);
  const deltaInHours = Math.floor(deltaInMinutes / 60);
  const deltaInDays = Math.floor(deltaInHours / 24);

  if (deltaInMinutes < 1) {
      return "just now";
  } else if (deltaInMinutes < 60) {
      return `${deltaInMinutes}m ago`;
  } else if (deltaInHours < 24) {
      return `${deltaInHours}h ago`;
  } else if (deltaInDays < 30) {
      return `${deltaInDays}d ago`;
  } else if (deltaInDays < 365) {
      const months = Math.floor(deltaInDays / 30);
      return `${months} month ago`;
  } else {
      const years = Math.floor(deltaInDays / 365);
      return `${years} year ago`;
  }
}


export function formatDateInput(inputDate: string): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dateObj = new Date(inputDate);
  const month = months[dateObj.getMonth()];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();

  return `${month} ${day}, ${year}`;
}  


export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12; 
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}


export const formatDate = (dateStr: string): string => {
  const [year, month, day] = dateStr.split('-');
  return `${day}-${month}-${year}`;
};




export function formatDateToDayMonthYear(dateStr: string): string {
  if (!dateStr) return "";

  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const dateObj = new Date(dateStr);

  return dateObj.toLocaleDateString(undefined, options);
}


export function formateDate(dateStr: string): string {
  if (!dateStr) return "present";

  // Correctly type the options object
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  const dateObj = new Date(dateStr);

  return dateObj.toLocaleDateString(undefined, options);
}

