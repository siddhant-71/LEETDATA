document.addEventListener("DOMContentLoaded",()=>{
    const Container=document.querySelector(".container");
    const UserInput=document.querySelector("#UserName-input");
    const SearchButton=document.querySelector("#Search");
    const Box=document.querySelector(".box");
    const EasyProgress=document.querySelector(".easy");
    const MediumProgress=document.querySelector(".medium");
    const HardProgress=document.querySelector(".hard");
    const EasyText=document.querySelector(".easy-text");
    const MediumText=document.querySelector(".medium-text");
    const HardText=document.querySelector(".hard-text");

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function ShowOnScreen(userdata){
        document.querySelector(".stats-Container").style.display="";
        console.log(userdata);
        const easySolved=userdata.easySolved;
        const mediumSolved=userdata.easySolved;
        const hardSolved=userdata.easySolved;
        const totalEasy=userdata.totalEasy;
        const totalMedium=userdata.totalMedium;
        const totalHard=userdata.totalHard;
        const totalQuestions=totalEasy+totalMedium+totalHard;
        const totalSolved=easySolved+mediumSolved+hardSolved;
        const LastSubmissions=userdata.recentSubmissions;
        const easyPer=(easySolved/totalEasy)*100;
        const mediumPer=(mediumSolved/totalMedium)*100;
        const hardPer=(hardSolved/totalHard)*100;
    /*UPDATE PROGRESS ->*/
            EasyProgress.style.setProperty("--progress-degree",`${easyPer}%`);
            MediumProgress.style.setProperty("--progress-degree",`${mediumPer}%`);
            HardProgress.style.setProperty("--progress-degree",`${hardPer}%`);
            EasyProgress.addEventListener('mouseenter',()=>{
                EasyText.innerHTML=`<div>${Math.floor(easyPer*10)/10}%</div> <div>(${easySolved}/${totalEasy})</div>`;
            })
            EasyProgress.addEventListener('mouseleave',()=>{
                EasyText.innerText=`Easy`;
            })
            MediumProgress.addEventListener('mouseenter',()=>{
                MediumText.innerHTML=`<div>${Math.floor(mediumPer*10)/10}%</div> <div>(${mediumSolved}/${totalMedium})</div>`;
            })
            MediumProgress.addEventListener('mouseleave',()=>{
                MediumText.innerText=`Medium`;
            })
            HardProgress.addEventListener('mouseenter',()=>{
                HardText.innerHTML=`<div>${Math.floor(hardPer*10)/10}%</div> <div>(${hardSolved}/${totalHard})</div>`;
            })
            HardProgress.addEventListener('mouseleave',()=>{
                HardText.innerText=`Hard`;
            })
    //UPDATE TABLE
        let LastTwentySubmissions=userdata.recentSubmissions;
        let textTableData="";
        for(let i=0;i<LastTwentySubmissions.length;i++){
            let Submission=LastTwentySubmissions[i];
            let No=i+1;
            let QuestionTitle=Submission.title;
            let time=formatTimestamp(Submission.timestamp);
            let Status=Submission.statusDisplay;
            let lang=Submission.lang;
            textTableData+= `<tr>
                    <td>${No}</td>
                        <td>${QuestionTitle}</td>
                        <td>${time}</td>
                        <td>${lang}</td>
                        <td>${Status}</td>
                    </tr>`
        }
        document.querySelector(".table-data").innerHTML=textTableData;
        document.querySelector(".Ranking").innerText=`Rank - ${userdata.ranking}`;
    }
    async function fetchUserDetails(username) {
        const url=`https://leetcode-api-faisalshohag.vercel.app/${username}`;
        try{
            SearchButton.disabled=true;
            SearchButton.innerText="searching";
            let response=await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch User details");
            }
            const userdata=await response.json();
            ShowOnScreen(userdata);
        }   
        catch{
            alert("NO DATA FOUND");
        }
        finally{
            UserInput.value="Siddhantd711";
            SearchButton.disabled=false;
            SearchButton.innerText="search";
        }
    }

    function Validate(username){
        if(username.trim()===""){
            alert("UserName can not be empty");
            return;
        }
        let regex=/^[A-zA-Z0-9_-]{1,15}$/;
        if(!regex.test(username)){
            alert("Invalid Username");
            return ;
        }
        fetchUserDetails(username);
    }

    SearchButton.addEventListener('click',()=>{
        const username=UserInput.value;
        Validate(username);
    })
})




/*

        <tr>
            <td>1</td>
            <td>Course Schedule</td>
            <td>17-03-2025 23:49</td>
            <td>cpp</td>
            <td>ACCEPTED</td>
        </tr>

*/