import { useAppSelector } from "../../app/hooks"
import "./Goals.css"

const Goals = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  return (
    <section id="goals" className={isDarkMode ? "goals--dark" : "goals"}>
      <div className="row">
        <div id="five-year-goals" className="container container--goals">
          <h3
            className="section-title section-title--goals"
            data-aos="fade-right"
          >
            Five Year Goals
          </h3>
          <p className="section-desc section-desc--goals" data-aos="fade-right">
            List the 5 most important goals that you want to achieve within the
            next five years. What are your most ambitious dreams and desires?
            Don't sell yourself short here.
          </p>
          <ol className="five-year-goals__list">
            <li
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-anchor="#five-year-goals"
            >
              On or before June 30, 2023, I have paid off all my student loan
              debts.
            </li>
            <li
              data-aos="fade-right"
              data-aos-delay="400"
              data-aos-anchor="#five-year-goals"
            >
              In the year 2023 or earlier, I have landed a job as a
              junior/mid-level frontend developer making at least $80k/year.
            </li>
            <li
              data-aos="fade-right"
              data-aos-delay="600"
              data-aos-anchor="#five-year-goals"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus
              deleniti assumenda eaque asperiores sequi ratione atque autem
              repudiandae delectus cupiditate?
            </li>
            <li
              data-aos="fade-right"
              data-aos-delay="800"
              data-aos-anchor="#five-year-goals"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              culpa voluptatum quibusdam fugiat esse doloribus numquam libero
              quae quisquam eius.
            </li>
            <li
              data-aos="fade-right"
              data-aos-delay="1000"
              data-aos-anchor="#five-year-goals"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quis
              tempore sunt, natus ducimus sed laudantium eius. Quas, voluptatem
              ipsum.
            </li>
          </ol>
        </div>
        <div id="milestone-goals" className="container container--goals">
          <h3
            className="section-title section-title--goals"
            data-aos="fade-left"
          >
            Milestone Goals
          </h3>
          <p className="section-desc section-desc--goals" data-aos="fade-left">
            List out all of the general goals you want to complete in your life
            and order them by category. Set realistic, measurable goals that you
            can continuously improve upon. Every time you hit a milestone goal,
            replace it with a new one. You'll be surprised how far you can go.
          </p>
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-anchor="#milestone-goals"
          >
            <p className="milestone__category">Health</p>
            <ul className="milestone__list">
              <li className="milestone__complete">Start working out again.</li>
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
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="400"
            data-aos-anchor="#milestone-goals"
          >
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
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="600"
            data-aos-anchor="#milestone-goals"
          >
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
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="800"
            data-aos-anchor="#milestone-goals"
          >
            <p className="milestone__category">Intellectual</p>
            <ul className="milestone__list">
              <li className="milestone__complete">Read 25 books.</li>
              <li className="milestone__complete">Read 50 books.</li>
              <li>Start practicing guitar again.</li>
              <li className="milestone__complete">Start learning Tagalog.</li>
              <li>Complete all Tagalog lessons on Pimselur.</li>
              <li className="milestone__complete">
                Learn and become skilled aat blackjack basic strategy.
              </li>
            </ul>
          </div>
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="1000"
            data-aos-anchor="#milestone-goals"
          >
            <p className="milestone__category">Spiritual</p>
            <ul className="milestone__list">
              <li className="milestone__complete">Start meditating again.</li>
            </ul>
          </div>
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="1200"
            data-aos-anchor="#milestone-goals"
          >
            <p className="milestone__category">Travel</p>
            <ul className="milestone__list">
              <li>Take a road trip across the country.</li>
              <li>Visit Europe.</li>
              <li>Visit 5 other countries.</li>
            </ul>
          </div>
          <div
            className="milestone__container"
            data-aos="fade-left"
            data-aos-delay="1400"
            data-aos-anchor="#milestone-goals"
          >
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
  )
}

export default Goals
