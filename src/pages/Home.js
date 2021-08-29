import React from 'react';

function Home() {
    const style = { backgroundImage: "url(/images/background.jpg)", height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }
    return (
        <div style={style}>
            <div className="homeBox">
                <h2>Welcome to your game collector</h2>
                <hr></hr>
                <p>Game collector is a site where you can put all of your games together.</p>
                <p>It does not matter if you play the game on steam, blizzard or any other platform.</p>
            </div>
        </div>
    );
}

export default Home;