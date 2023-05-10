
export const getRemainingDays = (date: Date) => {
    const differenceInMilliseconds = new Date(date).getTime() - new Date().getTime();
    return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}


export const getTargetDateFormatted = (date: Date) => {
    if (date) {
        return new Date(date).toLocaleDateString("en-GB");
    }
    return '';
}
