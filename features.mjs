// const gfName="MrsRandom";
//module.exports=gfName;
// export const gfName2="xcds"
// export const gfName3="kkjkjk";
//   export default gfName;
 //export {gfName2,gfName3};
 //module.exports={gfName};
 export const generateLovePercent=()=>{
  //return `${Math.random()*100}%`
  //return `${Math.floor(Math.random()*100)}%`
  //OR agar math.floor nhi krna to ~~ use krlo same hi baat padegi
  return `${~~(Math.random()*100)}%`
 }