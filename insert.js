//console.log('OKOKOKKOKJ');

for (let index = 18; index <=1485; index++) { //1485

    var s = Math.floor(Math.random() * (5 - 1 + 1) + 1);
    let data = {
        "data": {
          "name": "Hotel"+index,
          "business_category": "3",
          "star":s.toString()
        }
    }
    
    fetch(`http://127.0.0.1:1337/api/businesses`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(resData=>{
        console.log('resData',resData);
    })
    .catch(err=>{
        console.log('err',err);
    });
}