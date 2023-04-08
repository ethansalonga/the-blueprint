import "./styles/App.css"

function App() {
  return (
    <>
      <header id="header">
        <div className="row">
          <div className="container container--header">
            <h2 className="header__subtitle">Your standard for living life</h2>
            <h1 className="header__title">The Blueprint</h1>
          </div>
        </div>
      </header>
      <main>
        <section id="roles">
          <div className="row">
            <div className="container container--roles">
              <h3 className="section-title section-title--roles">Roles</h3>
              <p className="section-para">
                List out the various roles you play in your life in order of
                importance. Write a short description for each role as if you
                had just passed away. We all die sometime. Remember to focus on
                the things that truly matter to you. Be the best version of
                yourself.
              </p>
              <ul className="roles__list">
                <li>
                  <span className="bold">Me</span>: I want to die with no
                  regrets about my life. When I die, I want to know in my own
                  heart that I loved myself, that I valued myself as a person,
                  that I was comfortable with who I was and that I was the most
                  important person to me, not anyone else.
                </li>
                <li>
                  <span className="bold">Boyfriend</span>: I want Amanda to
                  remember me as the best thing in her life. I want her to say I
                  completed her the same way she did for me, and that I helped
                  make her life beautiful. I want her to remember me as loving,
                  strong, and someone who always put her first.
                </li>
                <li>
                  <span className="bold">Brother</span>: I want Bro to remember
                  me as an awesome brother. I want him to remember all the good
                  times we shared together and inside jokes we had. I want him
                  to know how much I cared about him, and want him to believe I
                  was always there for him.
                </li>
                <li>
                  <span className="bold">Son</span>: I want Mom and Dad to
                  remember me as a loving son who always appreciated everything
                  they did for me. I want them to know how much I always loved
                  them, even when I didn’t show it.
                </li>
                <li>
                  <span className="bold">Friend</span>: I want my friends to
                  remember me as a genuine, good, funny guy. I want them to
                  think back on all the memories and remember me fondly. I want
                  them to say I was an amazing person, and someone that people
                  always wanted to be around.
                </li>
                <li>
                  <span className="bold">Software Developer</span>: I want
                  people in my life to remember me as a skilled and devoted
                  software developer and programmer. I want to have a successful
                  career in top tech, and I want everyone to realize how hard I
                  worked to achieve this goal.
                </li>
                <li>
                  <span className="bold">Gym Guy</span>: I want people to
                  remember me as someone who they thought was fit and healthy. I
                  want them to say I cared about my body and recognize the time
                  and dedication I put into being happy with my body. I want
                  them to remember me as someone who took good care of their
                  physical health.
                </li>
                <li>
                  <span className="bold">Gamer</span>: I want everyone to
                  remember me as a passionate gamer. I want people to say I was
                  skilled at most games I played, and that I was always striving
                  for first place and to be the best I could.
                </li>
                <li>
                  <span className="bold">Nerd</span>: I want people to remember
                  me as someone who loved anime and manga. I want them to
                  remember me as owning an impressive physical manga collection
                  and many collectibles and figurines.
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="goals">
          <div className="row">
            <div id="five-year-goals" className="container container--goals">
              <h3 className="section-title section-title--goals">
                Five Year Goals
              </h3>
              <p className="section-para">
                List the 5 most important goals that you want to achieve within
                the next five years. What are your most ambitious dreams and
                desires? Don't sell yourself short here.
              </p>
              <ol className="goals__list">
                <li>
                  On or before June 30, 2023, I have paid off all my student
                  loan debts.
                </li>
                <li>
                  In the year 2023 or earlier, I have landed a job as a
                  junior/mid-level frontend developer making at least $80k/year.
                </li>
                <li>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Natus deleniti assumenda eaque asperiores sequi ratione atque
                  autem repudiandae delectus cupiditate?
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus culpa voluptatum quibusdam fugiat esse doloribus
                  numquam libero quae quisquam eius.
                </li>
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  quis tempore sunt, natus ducimus sed laudantium eius. Quas,
                  voluptatem ipsum.
                </li>
              </ol>
            </div>
            <div className="container container--goals">
              <h3 className="section-title section-title--goals">
                Milestone Goals
              </h3>
              <p className="section-para">
                List out all of the general goals you want to complete in your
                life and order them by category. Set realistic, measurable goals
                that you can continuously improve upon. Every time you hit a
                milestone goal, replace it with a new one. You'll be surprised
                how far you can go.
              </p>
              <div className="milestone__container">
                <p className="milestone__category">Health</p>
                <ul className="milestone__list">
                  <li className="milestone__complete">
                    Start working out again.
                  </li>
                  <li>Bulk to 170bs body weight.</li>
                  <li className="milestone__complete">
                    Start routinely visiting the dentist again.
                  </li>
                  <li>Start routinely visiting the doctor.</li>
                  <li>Start routinely visiting the dermatologist.</li>
                  <li className="milestone__complete">
                    Visit the eye doctor and update glasses and contacts
                    prescriptions.
                  </li>
                  <li className="milestone__complete">Get invisalign.</li>
                  <li>Quit porn for good.</li>
                </ul>
              </div>
              <div className="milestone__container">
                <p className="milestone__category">Career</p>
                <ul className="milestone__list">
                  <li>
                    Land a job with good benefits (401k and health insurance).
                  </li>
                  <li>
                    Land a job as a senior top tech frontend developer making at
                    least 200k/year.
                  </li>
                </ul>
              </div>
              <div className="milestone__container">
                <p className="milestone__category">Financial</p>
                <ul className="milestone__list">
                  <li className="milestone__complete">
                    Pay off student loan debts.
                  </li>
                  <li>Pay off car lease.</li>
                  <li>Get back to $28,571 net worth.</li>
                  <li className="milestone__complete">
                    Restructure budget and better organize finances.
                  </li>
                </ul>
              </div>
              <div className="milestone__container">
                <p className="milestone__category">Intellectual</p>
                <ul className="milestone__list">
                  <li className="milestone__complete">Read 25 books.</li>
                  <li className="milestone__complete">Read 50 books.</li>
                  <li>Start practicing guitar again.</li>
                  <li className="milestone__complete">
                    Start learning Tagalog.
                  </li>
                  <li>Complete all Tagalog lessons on Pimselur.</li>
                  <li className="milestone__complete">
                    Learn and become skilled aat blackjack basic strategy.
                  </li>
                </ul>
              </div>
              <div className="milestone__container">
                <p className="milestone__category">Spiritual</p>
                <ul className="milestone__list">
                  <li className="milestone__complete">
                    Start meditating again.
                  </li>
                </ul>
              </div>
              <div className="milestone__container">
                <p className="milestone__category">Travel</p>
                <ul className="milestone__list">
                  <li>Take a road trip across the country.</li>
                  <li>Visit Europe.</li>
                  <li>Visit 5 other countries.</li>
                </ul>
              </div>
              <div className="milestone__container">
                <p className="milestone__category">Lifestyle</p>
                <ul className="milestone__list">
                  <li>Move into my own apartment / buy a house or condo.</li>
                  <li>Start rebuilding wardrobe from scratch.</li>
                  <li className="milestone__complete">Get my next tattoo.</li>
                  <li className="milestone__complete">Get contact lenses.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section id="personal-statement">
          <div className="row">
            <div className="container container--statement">
              <h3 className="section-title section-title--statement">
                Personal Statement
              </h3>
              <p className="section-para">
                What would you say if you were to give yourself your most
                profound advice? What words would be most important for you to
                remember throughout your entire life? What drives you, gives
                your life meaning? Without being genuine to yourself you are
                unable to be genuine to anyone else.
              </p>
              <div className="statement-content-container">
                <p className="statement-para">
                  Love yourself. You’re the only person in this life that will
                  be with you no matter what. Take care of yourself, respect
                  yourself, better yourself. Learn to be on your own and be
                  happy with yourself. You’re deserving of everything you want
                  out of life, and anyone who gets in the way of that is not
                  worth keeping around.
                </p>
                <p className="statement-para">
                  Remember that while attaining absolute perfection will never
                  happen, striving to get as close to it as possible, to reach
                  the highest heights you could possibly go will always be worth
                  the effort. Always look to kaizen for inspiration and
                  guidance, the Japanese philosophy of changing for the better
                  and continuous improvement. Seek to be better than your
                  previous self every single day, even if in the most minuscule
                  of ways, even if only by 1%. Continuous growth does not always
                  occur upward. There will be periods of lows and setbacks, but
                  as long as you’re improving in the long run, consider your
                  growth a success. Stop comparing yourself to others.
                </p>
                <p className="statement-para">
                  Never stop learning, and never close yourself off in terms of
                  personal growth. Stay true to your convictions, but be
                  receptive to personal change and always keep an open mind.
                  Truly love and serve those closest to you. Live each day in
                  line with the ideal person you envision yourself to be.
                </p>
                <p className="statement-para">
                  Remember that the feelings of sadness and emptiness will not
                  last forever. Be grateful for all the blessings in your life
                  and do your best to remain positive, no matter the situation
                  or environment. On that same note, realize that much of life
                  is suffering and misery, and that’s okay. Learn to be okay
                  with being sad. Try your best to let your mind be at ease when
                  dealing with anxiety. Believe that everything will be okay.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
