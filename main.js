status_1 = ""
objects = []
user_object_name = ""

function preload() 
{
    
}
function setup() 
{
    canvas = createCanvas(520, 400)
    canvas.position(500,256)

    video = createCapture(VIDEO)
    video.hide()
}
function start() 
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("obj_name_result").innerHTML = "Staus: Object Detecting"
}
function modelLoaded() 
{
    console.log("Model is Loaded")
    status_1 = true
}
function gotresult(error, result) 
{
    objects = result
}
function draw() 
{
    image(video, 0, 0, 520,400)

    if (status_1 != "") 
    {
        objectDetector.detect(video, gotresult)
        console.log("Length = " + objects.length)
        user_object_name = document.getElementById("object_name").value
        if (objects.length > 0)
        {
            for(i = 0; i < objects.length; i++)
            {
                if (user_object_name == objects[i].label) 
                {
                    video.stop()
                    document.getElementById("obj_name_result").innerHTML = "Status = Object Found"
                }
            }
        }
    }
}
function speak() 
{
    var synth = window.speechSynthesis
    var utterThis = new SpeechSynthesisUtterance(speakdata)
    synth.speak(utterThis);
}