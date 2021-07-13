Webcam.set({
    width: 350,
    height: 300,
    image_format:"png",
    png_quality: 90
});
 camera=document.getElementById("camera");
 Webcam.attach(camera);

 function capture(){
     Webcam.snap(function(data){
         document.getElementById("result").innerHTML='<img id="pic" src="'+data+'">';
     });
 }
 classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/T1vlkY0Sj/model.josn")
pred="";
function speak(){
    var synth=window.speechSynthesis;
    speak_data="The prediction is "+pred;
    var utterThis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}
function identify(){
    img=document.getElementById("pic");
    classifier.classify(img, getResult);
}

function getResult(error, results){
    if (error) {
        console.error(error);
    } else {
       console.log(results);
       document.getElementById("predName").innerHTML=results[0].label;
       pred=results[0].label;
       speak()
       if (pred=="Perfect!") {
           document.getElementById("emoji").innerHTML="&#128076;";
       }
       if (pred=="5 fingers") {
        document.getElementById("emoji").innerHTML="&#128400;";
    }
    if (pred=="Peace!") {
        document.getElementById("emoji").innerHTML="&#9996;";
    }
    }
}