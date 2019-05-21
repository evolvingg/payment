window.onload = function(){
    var elem = document.getElementsByClassName('addCreditCard')[0];
    var form = document.getElementsByClassName('addCreditCardForm')[0];
    elem.addEventListener('click' ,function(event){
        form.style.display="block";
        var resp = callCardValid();
        console.log((typeof resp),resp);
        resp.then((message) => {
            console.log('resolved:',message);
            cardNumValidation(message);
        })
            .catch((message) => {console.log('rejected:',message);});

    });
    function callCardValid() {
        var xhttp = new XMLHttpRequest();
        return new Promise(function(resolve, reject) {
            xhttp.onreadystatechange = function() {
                var resp,clonedObj;
                if (this.readyState == 4 && this.status == 200){
                resp=JSON.parse(this.responseText);
                if(resp){
                    clonedObj = JSON.parse(JSON.stringify(resp));
                    for(var pat in clonedObj) {
                        clonedObj[pat].cardPattern = new RegExp(clonedObj[pat].cardPattern.split('/')[1]);
                    }
                }
                resolve(clonedObj);
                }
                else if(this.readyState == 4) {
                    reject("ulli");
                }
            }
            xhttp.open("GET", "https://api.myjson.com/bins/fvzpp", true);
            xhttp.send(); 
        });        
    }

    function cardNumValidation(resp) {
        var cardNum = document.getElementsByClassName('cardNum')[0];
        cardNum.addEventListener('keyup',function(event) {
                var elem = event.target.value;
                var flag=0;
                for(var i in resp){
                    if(resp[i].cardPattern.test(elem)){
                        flag=1;
                    }
                    console.log(resp[i].cardPattern.test(elem));
                }
                if(!flag){
                    alert('invalid please try again');
                }
        }); 
    }
}