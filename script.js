document.addEventListener(`DOMContentLoaded`, () => {
    const searchBtn = document.querySelector(`#searchBtn`);
    const userInput = document.querySelector(`#userInput`);
    const statsContainer = document.getElementsByClassName(`statsCon`);
    const easyLevel = document.getElementById(`easyLevel`);
    const mediumLevel = document.getElementById(`mediumLevel`);
    const hardLevel = document.getElementById(`hardLevel`);
    const statsCards = document.getElementById(`statsCards`);

    // Percent Calculation
    function percent(total, solved){
        const per = (solved/total)*100;
        return per;
    }

    function displayUserData(data){

        // Retriving Data
        const totalEasyQue = data.totalEasy;
        const solvedEasyQue = data.easySolved;
        const totalMediumQue = data.totalMedium;
        const solvedMediumQue = data.mediumSolved;
        const totalHardQue = data.totalHard;
        const solvedHardQue = data.hardSolved;
        const rank = data.ranking;
        const totalSol = data.totalSolved;
        const accRate = data.acceptanceRate;
        const conPoints = data.contributionPoints;
        const easyPercent = percent(totalEasyQue, solvedEasyQue);
        const mediumPercent = percent(totalMediumQue, solvedMediumQue);
        const hardPercent = percent(totalHardQue, solvedHardQue);

        // Displaying
        easyLevel.style.setProperty("--easy-degree", `${easyPercent}%`);
        mediumLevel.style.setProperty("--medium-degree", `${mediumPercent}%`);
        hardLevel.style.setProperty("--hard-degree", `${hardPercent}%`);
        easyLevel.innerHTML = `<p>Easy</p><p>${solvedEasyQue}/${totalEasyQue}</p>`;
        mediumLevel.innerHTML = `</p><p>Medium</p><p>${solvedMediumQue}/${totalMediumQue}`;
        hardLevel.innerHTML = `</p><p>Hard</p><p>${solvedHardQue}/${totalHardQue}`;
        statsCards.innerHTML = `
            <div id="ranking" class="card">
                <h3>Ranking : ${rank}</h3>
            </div>
            <div id="totalSolved" class="card">
                <h3>Total Solved : ${totalSol}</h3>
            </div>
            <div id="acceptanceRate" class="card">
                <h3>Acceptance Rate : ${accRate}</h3>
            </div>
            <div id="contributionPoints" class="card">
                <h3>Contribution Points : ${conPoints}</h3>
            </div>
        `
    }

    async function fetchDetails(username){
        const URL = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            const responce = await fetch(URL);
            if (!responce.ok) {
                throw new Error(`Responce not available`);
            }
            const data = await responce.json();
            console.log(data);
            displayUserData(data);
            
        } catch (error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`;
        }
        finally {
            searchBtn.style.cssText = 
                `background-color: blue;
                 width: 80px;`;
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }
    function validUser(username){
        if (username.trim() === "") {
            alert(`Username cannot be empty`);
            return;
        }
        const regex = /^[a-zA-Z0-9._-]{3,16}$/;
        const isValid = regex.test(username);
        if(!isValid){
            alert(`Invalid Username!`);
            return;
        } else {
            return isValid;
        }
    }
    searchBtn.addEventListener(`click`, () => {
        const username = userInput.value;
        if(validUser(username)){
            searchBtn.style.cssText = 
            `background-color: grey;
            width: 90px;`;
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;
            fetchDetails(username);
        }
    })
})