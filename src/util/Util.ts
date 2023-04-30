export const getRemainingDays = (date: Date) => {
    const differenceInMilliseconds = Math.abs(new Date().getMilliseconds() - new Date(date).getMilliseconds());
    return Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}


export const getTargetDateFormatted = (date: Date) => {
    if (date) {
        return new Date(date).toLocaleDateString("en-GB");
    }
    return '';
}
