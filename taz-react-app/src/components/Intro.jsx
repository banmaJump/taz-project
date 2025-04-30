import React from 'react';

const Intro = () => {
    return (
        <section id="intro">
            <a href="#" className="logo">
                <img src={`${process.env.PUBLIC_URL}/images/profIcon.jpg`} alt="プロフ" />
            </a>
            <header>
                <h2>プロフィール</h2>
                <p>
                Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking. Don't let the noise of others' opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition.{' '}
                    <a href="https://github.com/banmaJump">Steve Jobs</a>
                </p>
            </header>
        </section>
    );
};

export default Intro;