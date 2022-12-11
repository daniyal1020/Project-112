Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
 
camera = document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>";
    });
}

console.log("ml5.version", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/n3vzr_hFE/model.json",modelLoaded);

function modelLoaded(){
    console.log("modelLoaded");
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        if(result[0].label == 'Amazing'){
            document.getElementById('update_emoji').innerHTML = '&#128076;' + ' - This looks amazing';
            prediction = "This looks amazing";
        }
        if(result[0].label == 'Best'){
            document.getElementById('update_emoji').innerHTML = '&#128077;' + ' - All the Best';
            prediction = "All the Best";
        }
        if(result[0].label == 'Victory'){
            document.getElementById('update_emoji').innerHTML = '&#9996;' + ' - That was a marvelous victory';
            prediction = "That was a marvelous victory";
        }
        speak();
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}    