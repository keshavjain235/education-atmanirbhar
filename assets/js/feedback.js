const stars = document.querySelector(".stars").children;
        const value = document.querySelector("#value");
        for(let i = 0; i < stars.length; i++){
            stars[i].addEventListener("mouseover",function(){
                for(let j = 0;j<stars.length; j++){
                    stars[j].classList.remove("bgcolor");
                    stars[j].classList.add("trans");
                }
                for(let j = 0;j <= i; j++){
                    stars[j].classList.remove("trans");
                    stars[j].classList.add("bgcolor");
                }
            })
                stars[i].addEventListener("click",function(){
               value.value = i+1;
            })
        }

        //text
        function text(){
            var getval = document.getElementById("value").value;
            console.log(getval);
            if(getval != ""){
            document.getElementById("text").innerHTML = "Thanks For Sharing";
            }
        }
        //disable text
        function disb(){
            document.getElementById("text").innerHTML = " ";
        }