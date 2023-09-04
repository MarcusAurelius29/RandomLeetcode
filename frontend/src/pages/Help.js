import { useNavigate } from "react-router-dom";

function Help () {
    
    const navigate = useNavigate();

    const goBack = () => {
        navigate("/") // Add the protocol (http://) if needed
      }

      const sendPost = (e) => {
        var title = document.getElementById('leet-title').value;
        console.log(title);
        var link = document.getElementById('link').value;
        console.log(link)
        
        var checkboxes = document.getElementsByName('concept');
        var selected = [];
        for (var i=0; i<checkboxes.length; i++) {
        if (checkboxes[i].checked) {
        selected.push(checkboxes[i].value);
        }} 


        var diffCheckboxes = document.getElementsByName('difficulty');
        var selected1 = [];
        for(var j = 0 ; j < diffCheckboxes.length ; j++) {
            if(diffCheckboxes[j].checked) {
                selected1.push(diffCheckboxes[j].value);
        }}
        console.log(selected)
        console.log(selected1);

        if(title === "" && selected.length === 0 && selected1.length === 0)
        {
            alert('Please enter values')
        }

        fetch("http://localhost:4000/problems/" , {
            method: "POST",
            body: JSON.stringify( {
              title : title,
              DSAConcept : selected[0],
              Difficulty : selected1[0],
              LinkToProblem : link
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then( (response) => {
            if(response.status === 200)
            alert('Thanks for contributing');
        else if(response.status === 400)
        alert('Problem already exists!')
        })
        .catch( (error) => {
            alert(error.message);
        });




        e.preventDefault();

        document.getElementById('leet-title').value = '';
        document.getElementById('link').value = '';
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });
          diffCheckboxes.forEach((checkbox) => {
            checkbox.checked = false;
          });


    }       

    return(
        <div className="HELP-container">
        <h1>Please enter valid data of the leetcode problem!</h1>
        <form className="form-action-1">
            <p>Enter the title of the problem as per the actual title in Leetcode Website</p>
            <input type="text" className="problem-title-1" id="leet-title"/> 
            
            <br />

            <input className="type-checkbox-1" name="concept" type="radio" id='graphs' value='Graphs' />Graphs
            <input className="type-checkbox-1" name="concept" type="radio" id='dp' value='Dynamic Programming' />Dynamic Programming
            <input className="type-checkbox-1" name="concept" type="radio" id='trees' value='Trees'/>Trees
            <input className="type-checkbox-1" name="concept" type="radio" id='arrays' value='Arrays'/>Arrays
            
            <br />
            <br />

            <p>Please add difficulty</p>
            <input className=".difficulty-checkbox" name="difficulty" type="radio" value="Easy" id='easy' />Easy
            <input className=".difficulty-checkbox" name="difficulty" type="radio" value="Medium" id='medium' />Medium
            <input className=".difficulty-checkbox" name="difficulty" type="radio" value="Hard" id='hard' />Hard
            <br />
            <br />
            <label>Please enter valid link</label>
            <input type="text" id="link"/>
            <br />
            <br />

            <button className="Submit" onClick={(e) => sendPost(e)}>Submit</button>
            <br />
            <br />

            <br />

            <button className="Submit" onClick={goBack}>Back to Home</button>


        </form>
        </div>
    )
}

export default Help;