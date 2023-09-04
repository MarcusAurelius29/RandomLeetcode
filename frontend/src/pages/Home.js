import React from 'react';
import { useState , useEffect } from 'react'

    function Home() {
        const[leet , setLeet] = useState([])


        useEffect(
            () => {


                fetch("http://localhost:4000/problems/")
                .then(res => res.json())
                .then(leet => 
                    setLeet(leet)
                )
            } , []
        )
        
        const handleSubmission = () => {
 
          
            // Get the selected concepts
            const checkboxes = document.getElementsByName('concept');
            const selectedConcepts = Array.from(checkboxes)
              .filter((checkbox) => checkbox.checked)
              .map((checkbox) => checkbox.value);
          
            // Get the selected difficulty levels
            const diffCheckboxes = document.getElementsByName('difficulty');
            const selectedDifficulties = Array.from(diffCheckboxes)
              .filter((checkbox) => checkbox.checked)
              .map((checkbox) => checkbox.value);

              if(selectedConcepts.length === 0 || selectedDifficulties.length === 0)
              {
                alert('Please enter the required data');
              }
          
            // Filter problems by selected concepts and difficulties
            const filteredProblems = leet.filter((problem) =>
              selectedConcepts.includes(problem.DSAConcept) &&
              selectedDifficulties.includes(problem.Difficulty)
            );
          
            // Ensure that there are filtered problems and the random index is within bounds
            if (filteredProblems.length === 0 ) {
              console.error("No matching problems or invalid random index.");
              return;
            }
            const randomIndex = Math.floor(Math.random() * filteredProblems.length);
            // Select a random problem from the filtered list
            const randomObj = filteredProblems[randomIndex];
          
            // Check if the selected problem has the 'LinkToProblem' property
            if (!randomObj || !randomObj.LinkToProblem) {
              console.error("Selected problem does not have a 'LinkToProblem' property.");
              return;
            }
          
            window.open(randomObj.LinkToProblem);
          };

        const goToHelp = () => {
            window.location.replace("/help")
        }
        


        console.log(leet)

    return (

        <div className="container">
            <h1 className="heading text-red-500 ">Welcome to Random Leetcode Problem Generator</h1>
            <p className="subheading">A leetcode problem a day keeps unemployment away</p>

            <div className="main-input">
                <h3>Please select the Data Structure/Algorithm type you'd like to study today</h3>
                <label>
                    <input type="radio" name="concept" value="Graphs" /> Graphs
                </label>
                <label>
                    <input type="radio" name="concept" value="Dynamic Programming" /> Dynamic Programming
                </label>
                <label>
                    <input type="radio" name="concept" value="Trees" /> Trees
                </label>
                <label>
                    <input type="radio" name='concept' value="Arrays"/> Arrays
                </label>
            </div>

            <div className="difficulty">
                <h4>Please select the difficulty</h4>
                <label>
                    <input type="radio" className="easy" name="difficulty" value='Easy'/> Easy
                </label>
                <label>
                    <input type="radio" className="medium" name="difficulty" value='Medium' /> Medium
                </label>
                <label>
                    <input type="radio" className="hard" name="difficulty" value='Hard' /> Hard
                </label>
            </div>

            <div className='submit-button'>
                <button className='submit' onClick={handleSubmission}>Submit!</button>
            </div>

            <h4>Want to contribute a new Leetcode Problem?</h4>
            <p>Click here!</p>
            <button type='submit' className='submit' onClick={goToHelp}>Contribute</button>
            
            </div>
    )
    }

export default Home;