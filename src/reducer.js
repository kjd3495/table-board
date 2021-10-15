const CREATE = 'CREATE';
const SELECT = 'SELECT';
const DELETE ='DELETE';

export const Create = (data) => ({
    type: CREATE,
    data:{
        name:data.name,
        title:data.title,
        content:data.content
    }
})
export const Select = (id) =>({
    type:SELECT,
    id:id
    
})
export const Delete = (id) =>({
    type:DELETE,
    id:id
})
const initialState = {
    boards:[
{
    id: 1,
    name:'김재도',
    title:'다이아몬드A'
},
{
    id:2,
    name:'유희원',
    title:'샹치'
},
{
    id:3,
    name:'이태희',
    title:'블랙위도우'
},
{
    id:4,
    name:'엄지선',
    title:'엄지공주'
}],
    lastId:5,
    selectData:{}
}
export default function reducer(state = initialState, action){
        
    switch (action.type) {
            
            case CREATE:
                if(action.data.id===''){
                    return{
                        lastId:state.lastId+1,
                        boards: state.boards.concat({
                            ...action.data,
                            id:state.lastId+1
                        }),
                        selectData:{}
                    }
                }else{
                    return {
                        ...state, boards: state.boards.map(a=> a.id === action.data.id?{...action.data}:a)
                    }
                }
            case SELECT:
                return{
                    ...state,
                    selectData: state.boards.find(a=>a.id ===action.id)
                }
            
            case DELETE:
                return{
                    ...state,
                    boards:state.boards.filter(a=> a.id !== action.id)
                }     
                    
            
                default:
                    return state;
            }
        
    
}


