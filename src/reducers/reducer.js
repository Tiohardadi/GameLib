const initState={
    dataNewGames: {},
    dataGames: [],
    dataVideos: {}
}


export default (state=initState,action) =>{
    switch(action.type){
        case 'FETCHAPIGAMES':
            return {
                ...state,
                dataGames : action.data
            }
        case 'ADDAPIGAMES':
            return {
                ...state,
                dataGames : [...state.dataGames,...action.data]
            }
        case 'FETCHAPINEWGAMES':
            return {
                ...state,
                dataNewGames : action.data
            }
        case 'FETCHAPIVIDEOS':
            return {
                ...state,
                dataVideos : action.data
            }
        default:
            return state;
    }
}