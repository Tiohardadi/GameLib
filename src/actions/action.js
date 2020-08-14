export const fetchApiGames = (newData) =>{
    return{
        type: 'FETCHAPIGAMES',
        data: newData
    }
};
export const addApiGames = (newData) =>{
    return{
        type: 'ADDAPIGAMES',
        data: newData
    }
};
export const fetchApiNewGames = (newData) =>{
    return{
        type: 'FETCHAPINEWGAMES',
        data: newData
    }
};
export const fetchApiVideos = (newData) =>{
    return{
        type: 'FETCHAPIVIDEOS',
        data: newData
    }
};