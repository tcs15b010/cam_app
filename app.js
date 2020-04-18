if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
  console.log("Let's get this party started") ;
// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const selectr = document.getElementById('select');
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

function gotDevices(mediaDevices) {
		//alert(mediaDevices);
    //  select.innerHTML = 'select camera';
      // select.appendChild(document.createElement('option'));
        let count = 1;
		var c = 0 ;
		
       mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      const option = document.createElement('option');
      option.value = mediaDevice.deviceId;
      const label = mediaDevice.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);
      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
      }

function cameraStart() {
	document.getElementById("p1").innerHTML = "cam start fun()";
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
	    document.getElementById("p1").innerHTML = "cam start";
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
	    document.getElementById("p1").innerHTML = "cam no access";
        });
}

function cameraStart_ing() {
	document.getElementById("p1").innerHTML = "you r in";
	funti();
        cameraStart() ;
	    navigator.mediaDevices.enumerateDevices().then(gotDevices);
       }
 function funti()
	{
		document.getElementById("p1").innerHTML = "funti";
	}

// Access the device camera and stream to cameraView


function myfun(){
 track.stop();
  const videoConstraints = {};
  if (selectr.value === '') {
    videoConstraints.facingMode = 'user';
  } else {
    videoConstraints.deviceId = { exact: selectr.value };
  }
  const constraints = {
    video: videoConstraints,
    audio: false
  };
	
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
			alert(error);
        });
};


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart_ing, false);
}
else
	alert('Oops cam no access') ;



