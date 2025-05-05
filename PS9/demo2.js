function GetWeather(){
    const city = document.getElementById("city").value.trim();
    const result = document.getElementById("result");

    const xhr = new XMLHttpRequest();
    xhr.open("GET","demo2.json",true);
    xhr.onload = function(){
        if(xhr.status === 200){
            const data = JSON.parse(xhr.responseText);
            const weather = data[city];

            if(weather){
                result.innerHTML = `
                
                `;
            }else{
                result.innerHTML = ${city}"not found";
            }
        }else{
            result.innerHTML = "Failed to load data";
        }
    };
    xhr.send();
}