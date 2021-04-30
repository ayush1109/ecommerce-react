import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';
const Congrats = () => {

    return (
        <div className="congo">
        <div class="congrats">
	    <h1 class="con">Congratulations!</h1>
        </div>
        <div className="home-page">
            <Link to="/"><Button variant="dark">Back To Shopping</Button></Link>
        </div>
        </div>
    );
}

export default Congrats;