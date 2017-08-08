let actionTypes={

}

let ActionTypeHax = actionTypes;

Object.keys(ActionTypeHax).forEach((category)=>{
  Object.keys(ActionTypeHax[category]).forEach((actionType)=>{
    ActionTypeHax[category][actionType] = category + '.'+actionType;
  })
})

export default actionTypes;