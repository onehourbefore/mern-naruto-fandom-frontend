export const formatDate = (date: string) => {
    const newDate = `${date.slice (8, 10)} ${date.slice (4, 7)} ${date.slice (11, 15)}`;
    const time = `${date.slice (16, 21)}`;
    return  [newDate, time];
};

