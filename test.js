var _Lib = function(){
	function renderListComment(data){
		var blockData = "";		
		data.map((item)=>{
			var rowData = `
				<div class="item-comment">
					<div class="thumbnail">
						<img src=${item.thumbnail} alt=${item.name}/>
					</div>
					<div class="info">
						<h2>${item.name}</h2>
						<p>${item.comment}</p>
						<p class="dateCreate">${item.dateCreate}</p>
					</div>
				</div>
			`;
			blockData += rowData;
		});
		document.querySelector(".list-comment").innerHTML = blockData;
	}
	function strProcess(strInput){
		var arrInput = strInput.split(" ");
		var strTmp = "";
		var count = 50;
		var arrOutput = new Array();

		for(var item of arrInput){
			if(item.length > 0){
				count = count - item.length - 1;
				if(count >= 0){
					if(arrOutput.length > 0){
						arrOutput.pop();
					}
					strTmp = strTmp	+ item + " ";
					arrOutput.push(strTmp);
				}
				else{
					arrOutput.push(strTmp);
					strTmp = item + " ";
					count = 50 - item.length - 1;
				}
			}
		}
		return arrOutput;
	}
	return{
		strProcess: strProcess,
		renderListComment: renderListComment
	}
}();

var page = function(){
	function initial(){
		if(localStorage.getItem("tempData")==null){
			var data = [
				{
					thumbnail: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAABMlBMVEUAq8h6ADpOGWX5sSOyAGaWwR/mAH4Arsx3Ajj/tiN+ADoNbXwIhpv/tSNOGWcDo76rA2LuAIIrGSqaxh9LDyoaGBM6Eya4AGloBjNSEjEPHxQSHhZHEionGiArFRwvFR4UFxt6nB4dFR5abR1BTxzbA3mKCFKQuB+Cph5eCTEcGhoyLhwcHxy5B2UFlKwgGh7RliGUbR+IZR8YGRI1Gz8wEiSgdSDwqyIPYW7BjCE/Gk4+NR1eSx7joyKtfiBGGltqVB5fdh1TPxo6G0cXJSoXJSIVGxsjJRxIVxwWOUFthx5cETgrGSt+C0oKeYsYMjJ2lB56Xh4zNReaBlcUSE0SUFc7RBwWOzwxGzcSVFolKhhyDUYiFBI9QxcVKiVKPR1GVRxSZR01KhwrIBdYSR05LBh5e2fmAAAJz0lEQVRoge2aeVfiSBeHFaFDAgGGEJYRMMYekZABJLIvIkIQF2wEXGlpe/n+X2GqKgvZoIPdfc57zsvvD4+kKvdJVarq3luVra2NNtpoo4022mij/wV5s1sYtqQM83u9W4ZCbCvrzS69AZb67XFntPDgMVqXrGQHuf633FRvqMLQz7mu1xKNDR8EeuZZ9lh6cDISeNnrWRjCvLm3FEUdfe5qyYO7fYpynXEW1rHsbfJlHInbBjudkRe6YqrtZ84oFxD1caCWYdM7F7r2KZc1cYfClTPiXAvsjIxNHYR57hDX5UrR6jv1c0fSRepiaqw/pA+RqbXATueY9hoMDd6OZN1XsrI8z8q1s67BvJ+/QZbWBUdebvX1sYccI4ujVXHqNc5QfRKTDa0Jdjpn+iZjkwK+Qi1Di7N0wPk+cORK/9aw4VdyZ6nwjn40YpV45J1g5+GrofO6bXwZGj9m9LMbm7ysDXYGJI15v17Z7rzaLJN6OvzZrDZEr77u1u2NbCZgF0zv/i1pl6f1EnhRZBh+flxW0eROqdNnGFE01qV51YxgE7z34R9Zu24rRWNBviCT8VKfDUWtam1zTtnKh5hd8F8fJAHwtqWINDsvI3CDSRNL6nD/ymb++n1goGIGkMlOcGmNPwUmit9xfMSuqPCHwNtuptpkosvL/xiYCNXb4SXv94+Ct90cv6LBfxBM7OVWNPh9YFkfdGACSfM7XiSMxXqwYscumE4o4hdgdzocZNliPLowHlq8YiIaKrKgOOZeXMqpZqyiIivw7FDRosUhJjNqVaulBh9UVwwVTESL4vfjarVVqDNh5RaCe1HMhO2B/YLsnJwBBexOZKo4SUKHUC6IcUIPJmJMuwkdB0ni+TkbVcCHindKen9OBcJ6hwawm23vqF4Bz/dloAwmYnwVX7jHgjy5AVgxI9iLq7GnUEQPZtu45P+QPySb/RihAafFPCmXkpJjduvAkasHWz0NYhZhrAUT8ToyWG3PO4Um7NGqZFoCu9kSvFY+7swbLVSxgUa7Cg7M7PU0bPKeFuxm8sBcucNUhp4BV8KhaYSUwLE6Dp+FHniGle6PJqwqRjXgSNxug4Fu4xqwZLkz8GNAXga2Ko+ajMAEiy6AGQM1/Qp8Fo6WUhkcuerZe8NI/ttwICKDieIxuUO2unJvDL/B3uynFbBbhKi5HOhhAxghVFkFHAnEe6YEY6Wm9NU44kRgtqoNIbEu/Pk9pIDTGdAfTSXQA4Eo+gnv48YgB5s9rNFeZCE7ERJhtHLBV4x/VQYINoAd0IZzWQLPAanaXWQ0cPyLEJwrJoQH6xxylTzd/pc3ZACBfwyVFsvgbWtwVgO+uHhmKpbp7or2djOXFJVilK4mG2psj55jHlPBfQAuc/KLxDw/1K5mQfa6fyeu02Ysy7yBlNclgcNovDBSfohV4KQmkSeWB1cTjuOJbL5bgiMRDS52H+aQZ9zQPtnPHKDUE4Gl4YOPulkwXbYqdB7OWladx0QQdP1O+dt0CxRnBx0SjkT4IiSwi7o0581LGzz4KKW8EngbzVSywA2mk+4PuDzi8/hi5Ur34VttzpnJdMC04f/SLJfBLurAmL4ulZdOubTgWB/G0GS5NCpU0apcYjVLJpEY4ch3HI+Om/A/so7clwJ2URl7XhFkW2+UDkwU51K2gpwA6GgxrfVOUaaEa4sbrOSdVLApY18GZuQ7FPC2O1lvLtxiSYzp3OJ2mimQSjFZ/i7H2irYlcrZW0SyM0qWAt7eDvMF4OqBo8erczVpUSOQKFtvkai4fNwvyveg6SQpM7QF9tIHstACIllJF8X5qFBoZ5j4IhxaxFwhtt8YFUZznlUDI7CAKHZsvmQv/eWjLBUM7Lhj4XA4nt62DPbAk4VAaUwTChK5e9nKl749sFVXS6Z04SsIEPaIVcWLrr6zuYbkjgyDy1pEkltRqhlcLptLCDY4oOyA3Xw/bQdMXdqdTsNvdlpMhBsFXSqxFHxn3pxcQr59o34OjjL5Mr+iyeqSecbYwwJlc5fUz8ButoCTrRUJsuIk9mn7jhEbcmibdjmYiLINEkXvy7ZAFLf4iba5UktkL/P5yDSdFjbdIWZESttqYthtjUbTKXXBrMOFJwBT7u7gUtSCiWhaUizM1JWkhcx3mGJILohqH4HInR3cc5OlZwbLyQLPaleudELMINU7o/wiVwL+sPC9LpVoFkwIZkV+4l+X6xHCN4GAJjFPi4Wysk9r2M8kles7JT60yI+5sfMwJjytB54kDyOaNBXmMS1856ci84sJJgX04/DtGoE1NikGdPkxWJcbNrhwmKtripI7xW/X6OdkQM6doooSx3mo8rJtYxLfQRVanHqLki2GjWcVS+UXlART4KF6PfAHbtsyjJgpNC2aDpLUOipnRHQDum1XsULbDDOxSlhJzAUYs2LD19xJzeGDOq1diyMz95i/Pj9FFRy1k0RPyhxf1cR8YtNJvN5o9xD8k9m5z6HKd8rWywZwh61pa9QSt2D2LnY0xoLdng4swJj/NejQy/eY0ZHJDmuqwYPoXwVHbG4JeGfKlv4YtLh37XMY7V5rhzhZMHJBjRNA7h0qdsL2IhAvvauI3poETVwgproAN8VTcwXf4y3WExQz6x8NCMOZBRY0aK42mWw/Wj2aL+F5dX54/9HA64kV2MEyTRXMsxYtdjhqvd6v7N5y1twvzy1lIcmLB4wV2ZfY/RWwVTf6rj9SH5VTmJ3WM/XGWj3dyS+BaxYWz/su6mIkg8nSHYibrV7I6S+BrQYse0ZRB8qEIgsgl95nrJr8S2CrlvAglDrKKe7oK4jOqOdziwfkfzP45B7EgdS91GS80IcR3dvjbwEn/1GP+Cy6+hEF3al+J0/izbZ4hHIF8/LmcPABxUxo/UNN8+DyPUofKKS+MBzH3KfQj0+sGXy6/qGmen4cECyG66OcWVGuo/2U/O+lxcJ6LqhOYv2DayFnNnhyQbkMog7M8913Lax/cK0e1U965r6uPZvB9+aeORWm7z6qjySHnoS5yerejKoUZxqEvuD03R8nRG56GHZr7kQ0n3QNvjAP6nPejz1cve9zjMAM+O8sf24yyp7pyNQnc4NrMEXM0ofvAQf2njCYvtEnRnKNu9SQqX3euG75zlGKiHlm47U/uYkcJqXYEMv2gqc+I/mAktEUdckbnsznuOaH8lbvDH50swY4chhXJz3mf6Kv5ehW0Sn7fJaC+zmuyzsQYepUe6TVVA0b7oZv7INnYbr3pEnzsOxTj04ENbq+5rhc5vPnO47jgtfakgTNTzWZKeavvNLhpM2zRc8wa/h0DsOyQ48tWd9qN5Ww/gjOnmzb22ijjTbaaKON/n/1H6PdthVr7XzDAAAAAElFTkSuQmCC",
					name: "Hong That Cong",
					comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
					dateCreate: "23/4/2018"
				},
				{
					thumbnail: "data:image/png;base64,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",
					name: "Hoang Duoc Su",
					comment: "t is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
					dateCreate: "24/4/2018"
				},
				{
					thumbnail: "data:image/png;base64,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",
					name: "Au Duong Phong",
					comment: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature",
					dateCreate: "24/4/2018"
				},
			];
			localStorage.setItem("tempData",JSON.stringify(data));
		}
		_Lib.renderListComment(JSON.parse(localStorage.getItem("tempData")));
		detectButtonSubmit();
	}
	function detectButtonSubmit(){
		document.querySelector("button#submit-comment").addEventListener("click", ()=>{
			var strName = document.querySelector("input[name='name']").value;
			var strMessage = _Lib.strProcess(document.querySelector("textarea[name='comment']").value);
			
			var data = JSON.parse(localStorage.getItem("tempData"));
			console.log(strMessage);
			var arrTmp = new Array();
			if(strMessage.length > 0){
				strMessage.map((item, index)=>{
					console.log("item: " + item + "-" + index);
					var now = new Date();
					var itemComment = {
						thumbnail: "http://casitaoaxaca.com/koken/storage/cache/images/000/033/oxc-fb-profile-img-h5,tiny.crop.2x.1501091503.png",
						name: strName,
						comment: index + "/" + strMessage.length + "" + item,
						dateCreate: now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear()
					};
					arrTmp.push(itemComment);
				});
			}
			data = [...arrTmp];
			localStorage.setItem("tempData",JSON.stringify(data));
			_Lib.renderListComment(JSON.parse(localStorage.getItem("tempData")));
		});
	}
	return{
		initial: initial
	}
}();
window.addEventListener('DOMContentLoaded', function(){
    page.initial();
});