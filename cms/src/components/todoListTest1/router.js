const OuterMostRouter = {
  path:'/',
  component:require('./index'),
  getComponent(location,cb){
    require.ensure([],(require)=>{
      cb(null,require('./index'))
    })
  } 
}
export default OuterMostRouter;