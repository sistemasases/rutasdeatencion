






$(function() {
 
     /*     variables       */

     //obtener la informacion del json
     const json = getJson();


     /* fin de las varibles */

     //activar las funciones en paralelo
     Promise.all([screenResponsiveWebDesing(json),svgPaint(json) ,rutesAttentionMovil(json) ])
    
     /* EVENTOS CLICK  */


});


/* Pintar las flechas con su nombe siempre al iniciar*/
function svgPaint(json) {
  
  let iterador = 5;
  json.then( function(event) {

    for (let i = 1 ; i <= 4 ; i++) {
    $('#arrows-'+i).show()
    $('#arrows-'+iterador).hide()
    let wordDimension = Object.keys(event)[i-1]
    wordDimension = wordDimension.charAt(0).toUpperCase() +  wordDimension.slice(1);
    $('#arrows-'+i + ' text').html(wordDimension)
    iterador++;
    }

  }).catch((err) => {

      console.log('ups, paso un error al insertar el texto' , err)
      
  });

}


/* INSERTAR EL TEXTO DEL JSON A SU RESPECTIVO CAJON */
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

      // no olvidar colocar una restricion para la dimension individual
      nameAttention = (Object.keys(value[dimension][attention][nameEntity]))[0]
      $(objectInsert).html(value[dimension][attention][nameEntity][nameAttention][about])
      
    }).catch(  (err) => {

      console.log('ups, paso un error al insertar el texto' , err)
      
    });
   
}


/* Peticion local al servidor donde se aloja el json  */
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





