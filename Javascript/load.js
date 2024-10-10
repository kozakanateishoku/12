const output_csv = document.getElementById('log1');
let dataArray = [];
let go = false;

function csv_data(dataPath) {
	const request = new XMLHttpRequest(); // HTTPでファイルを読み込む
	let aaaa = [];
	request.addEventListener('load', (event) => { // ロードさせ実行
		const response = event.target.responseText; // 受け取ったテキストを返す
		const dataString = response.split('\n'); //改行で分割
		for (let i = 0; i < dataString.length; i++) { //あるだけループ
			dataArray[i] = dataString[i].split(',');
		}
		go = true;
	});
	request.open('GET', dataPath, true); // csvのパスを指定
	request.send();
	
}


async function sign(){
	
	function input(uuu,aaa = true){
		output_csv.innerHTML += uuu;
		if(aaa){
			output_csv.innerHTML += "<br>";
		}
	}
	async function sleep(aaa){
		await new Promise((resolve) => setTimeout(resolve,aaa))
	}

	async function check(){
		for(let i = 0; i < 3;i++){
			for(let j = 0;j < 4; j++){
				if(j != 3){
					input(".",false);
				}else{
					input("認証中",false);
				}
				await sleep(250);
			}
			if(i != 2){
				output_csv.innerHTML = "";
			}else if(answer == "冬"){
				input("　認証完了！");
				document.getElementById("button").disabled = true;
				asyncProcess();
			}else{
				input("　認証失敗！　答えを入力しなおしてください")
			}
		}
	}

	async function asyncProcess() {

		async function inpt(aaa){
			input("user:" + dataArray[aaa][0] + "　" + dataArray[aaa][1] + dataArray[aaa][2]);
			
		}

		await sleep(100);
		csv_data("content.csv");
		while(!go){
			await sleep(10);
		}
		input("ロード完了")
		for(let i = 1; i < dataArray.length;i++){
			inpt(i)
			await sleep(500);
		}
	}

	output_csv.innerHTML = "";
	let answer = document.getElementById("answer").value;	
	check();
	
}
