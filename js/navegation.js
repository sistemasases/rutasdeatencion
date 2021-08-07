






$(function() {
 
     /*     variables       */

     //obtener la informacion del json
     const json = getJson();

    //llamar la funcionalida movil
    screenResponsiveWebDesing()





});


function get_information_about_attention(json,objectInsert,attention,nameEntity,about) {

    //variables internas   
    let dimension;
    let nameAttention;

    //obtener el nombre de la dimension presionada
    $('.dimension').each( (index,value)=> {
        
         if ( $(value).hasClass('active') ) {
         dimension = $(value).attr('title');
         console.log(dimension)
         }

    })

    //Insertar el texto 
    json.then( (value) => {

      // no olvidar colocar una restricion para la dimensio individual
      nameAttention = (Object.keys(value[dimension][attention][nameEntity]))[0]
      $(objectInsert).html(value[dimension][attention][nameEntity][nameAttention][about])
      
    }).catch(  (err) => {

      console.log('ups, paso un error al insertar el texto' , err)
      
    });
   
}


async function getJson() {

   const answer = await fetch('dataBase/data.json');

   if (!answer.ok) {

    let error = "Error 404. dataBase Json, no found";
    console.log("hey")
    throw new Error(error);

   }
   else {

   const objectJson = answer.json();
   return objectJson;

   }


}


