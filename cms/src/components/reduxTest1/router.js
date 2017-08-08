const OuterMostRouter = {
  path:'oneExample',
  component:require('./index'),
  getComponent(location,cb){
    require.ensure([],(require)=>{
      cb(null,require('./index'))
    })
  } 
}
export default OuterMostRouter;