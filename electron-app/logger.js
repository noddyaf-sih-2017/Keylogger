const fs = require('fs')
const path = require('path')

let buffer = [] 
let oldstroke = new Object()
let oldstroke1 = new Object()
let newstroke = new Object()
let downbuffer =[]
let upbuffer =[]
let writebuf = []

const filename = 'tmp.txt'
const outputdir = 'data'
const createfile = path.join(__dirname, outputdir, filename)
const textField = document.getElementById('text')

if (!fs.existsSync(outputdir)){
    fs.mkdirSync(outputdir)
}

// Uncomment this line to create new files every render
// let createfile = './data/tmp' + Date.now() + '.txt'

let getFileName = () =>{
    let username = document.getElementById('username').value
    if(!username || username.length == 0)
        username = 'anon'

    return path.join(__dirname, outputdir, 'data-' + username + '.txt')
}

let records= () =>
{
  let obj
  let output_line = ""
  for(let i = 0; i < buffer.length; i++){
  	obj = buffer[i]
  	output_line = output_line.concat(obj.time+", "+obj.kftime+", "+obj.ftime+", ")
  }
  // localStorage.setItem("keylogs", JSON.stringify(buffer))
  // console.log(localStorage.getItem("keylogs"))
  console.log(output_line.slice(0,-2))

  if(writebuf.length > 0){
        fs.appendFile(getFileName(), JSON.stringify(writebuf)+',', (err)=>{
            if(err) {
                return console.log(err)
            }
            writebuf  = []
            buffer = []
            downbuffer=[]
            upbuffer=[]
        })
    }

  textField.value = ""
}

textField.onkeydown = (e) =>{
    let timestamp = Date.now() | 0
    let stroke = {
        key: e.key,
        keyCode: e.which,
        time: timestamp

    }
    
    // if(stroke["key"] == "Backspace")
    // {   
        
    //      buffer = []
    //      downbuffer=[]
    //      upbuffer=[]
    //      writebuf = []
    //      document.getElementById("text").value = ""
    // }



    if(stroke["key"] == "Enter"){
    	records()
    }

    else if(stroke["key"] != "Shift" && stroke["key"] != "CapsLock"){
        downbuffer.push(stroke)
    }

}




textField.onkeyup = (e) => {
 
    let timestamp = Date.now() | 0
    let stroke = {
        key: e.key,
        keyCode: e.which,
        time: timestamp
    }

    
    // if(stroke["key"] == "Backspace")
    // {
    //      buffer = []
    //      document.getElementById("text").value = ""
    // }

    if(stroke["key"] != "Enter" && stroke["key"] != "Shift")
    {
        upbuffer.push(stroke)
        let up = upbuffer.shift()
        let down = downbuffer.shift()
        /*
        ft   = flight time
        kft = key press plus flight time
        time = key press time


        */
        let ftime
        try{
            ftime=-(oldstroke.time-down.time)
        }
        catch(e){
            ftime = 0
        }

        if (ftime<0)
        {
            ftime=0
        }
        if (buffer.length==0)
        {
            ftime=null
        }


        let time = up.time-down.time
        let uutime=oldstroke.time-up.time;
        let dutime=oldstroke1.time-up.time;
        let ddtime=oldstroke1.time-down.time;
        let kftime= ftime+time
        
        let _stroke = new Object()
        _stroke.key=down.keyCode
        _stroke.kftime=kftime
       
        _stroke.time=time
        _stroke.ftime=ftime

        _stroke.uutime=(-uutime);
        _stroke.ddtime=(-ddtime);
        _stroke.dutime=(-dutime);
    
        buffer.push(_stroke)
        writebuf.push(_stroke)

        oldstroke=up
        oldstroke1 = down

    }


    window.setInterval(() =>{
        document.getElementById("demo").innerHTML = JSON.stringify(buffer)
    }, 1000)
}
