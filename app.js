if('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices){
  console.log("Let's get this party started") ;

// Set constraints for the video stream
const select = document.getElementById('select');
//alert('please select camera');
var constraints = { video: { facingMode: "user" }, audio: false };


// Define constants
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
    
    function cameraStart_ing() {
        navigator.mediaDevices.enumerateDevices().then(gotDevices);
        cameraStart() ;

    }
    // Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
			alert('please use prev method for img cap');
        });
}

function myfun(){
 track.stop();
  const videoConstraints = {};
  if (select.value === '') {
    videoConstraints.facingMode = 'user';
  } else {
    videoConstraints.deviceId = { exact: select.value };
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
	alert('Oops cam no acc') ;