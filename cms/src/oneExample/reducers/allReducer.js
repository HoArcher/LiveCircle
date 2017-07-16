import * as actionTypes from '../actions/actionTypes'

let initialState={
  datas:[],
};
let ReducerFuns={};
let actionType =actionTypes;

ReducerFuns[actionType.LOADALLDATAS] =function(state,action){
  return Object.assign({},state,{
    datas:action.datas,
  })
}

// export default function todos(state=init,action){
//   switch (action.type) {
//     // case value:
      
//     //   break;
  
//     default:
//       return state;
//   }
// }

export default function AllReducer(state=initialState,action){
  if(ReducerFuns[action.type] !=undefined && ReducerFuns[action.type] !=null){
    return ReducerFuns[action.type](state,action);
  }
  else{
    return state;
  }
}