// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const path = require('path')
const spawn = require("child_process").spawn
const password = 'pass@123'

document.getElementById('save').addEventListener('click', ()=>{
	let username = document.getElementById('username').value
	const process = spawn('python', [path.join(__dirname, './preprocess.py') , username, password])
	process.stdout.on('data', function (data){
		console.log(data)
		console.log(new TextDecoder("utf-8").decode(data))
	});
})
