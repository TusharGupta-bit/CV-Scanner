console.log("This is CV screener");
// Data is an array of objects which contain information about the candidates.

async function Data() {
    const response = await fetch(`https://randomuser.me/api/?results=10&nat=us`);
    const user = await response.json();
    return user;
}

let a = Data();
a.then((data) => {
    let result = data.results;
    // console.log(result);
    // result.forEach((element, index) => {
    //     console.log(index + " " + element.name["first"]);
    // });

    //CV Iterator
    function CVIterator(profiles) {
        let nextIndex = 0;
        return {
            next: function () {
                return nextIndex < profiles.length ?
                    { value: profiles[nextIndex++], done: false } :
                    { done: true };
            }
        }
    }
    const candidate = CVIterator(result);
    nextCv();
    //Button listener for next button
    const next = document.getElementById("next");
    next.addEventListener('click', nextCv);

    function nextCv() {
        const currentCandidate = candidate.next().value;
        let image = document.getElementById('image');
        let profile = document.getElementById('profile');
        if (currentCandidate != undefined) {
            image.innerHTML = `<img src='${currentCandidate.picture["large"]}'>`;
            profile.innerHTML = `<ul class="list-group">
            <li class="list-group-item active">Name: ${currentCandidate.name["first"]}</li>
            <li class="list-group-item">Age: ${currentCandidate.dob["age"]}</li>
            <li class="list-group-item">Lives In: ${currentCandidate.location["city"]}, ${currentCandidate.location["state"]} United States</li>
            <li class="list-group-item">Email: ${currentCandidate["email"]}</li>
            <li class="list-group-item">Contact No: ${currentCandidate["phone"]} </li>
          </ul>`
        }
        else{
            alert('End Of Candidates');
            window.location.reload();
        }
    }
})


