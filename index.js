let elTexto = document.getElementById("texto");

//indexeddb
if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
let db;
const request = window.indexedDB.open("TestDatabase", 1);

request.onsuccess = () => {
  db = request.result;
  console.log('open', db);
}

request.onupgradeneeded = () => {
  db = request.result;
  console.log('create', db);
  const objectStore = db.createObjectStore('vozAtextodb', {
    //keyPath: "id", 
    autoIncrement:true 
  })
}

request.onerror = (error) => {
  console.log("Error", error);
}

function muestra(){
            let textPromesa = new Promise((resolve, reject) => {
              if (elTexto.length !== 0) {
                resolve(elTexto)
              }
            })
            textPromesa
            .then((me) =>{
              //console.log(me);
              let copiando = document.getElementById('copiando');
              copiando.innerHTML = elTexto.textContent;
              const datos = {
                textoCopiado : copiando.textContent,
              }
//vamos a agregara ala indexeddb
    function datosEnDb(datos) {
      const transaction = db.transaction(['vozAtextodb'], 'readwrite')
      const objectStore = transaction.objectStore('vozAtextodb')
      const request = objectStore.add(datos)
    }  
    datosEnDb(datos);
              elTexto.innerHTML = "";
              console.log(datos);
            })
            .catch((error) =>{
              console.log(error);
            }); 


}

function picar() {
     let rec;
        if (!("webkitSpeechRecognition" in window)) {
          alert("disculpas, no puedes usar la API");
        } else {
          rec = new webkitSpeechRecognition();
          rec.lang = "es-MX";
          rec.continuous = true;
          rec.interim = true;
          rec.addEventListener("result",iniciar);
          document.getElementById("copiando").innerHTML = "";
        }
    function iniciar(event){
      for (let i = event.resultIndex; i < event.results.length; i++){
           document.getElementById('texto').innerHTML = event.results[i][0].transcript;
            // console.log(event.results[i][0]);
             let textoEscrito = event.results[i][0].transcript;
             document.getElementById('guardaTexto').style="display:inline-block;"

      }
    }


    rec.start(); 


}
