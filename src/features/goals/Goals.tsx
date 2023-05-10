import { useAppSelector } from "../../app/hooks"
import FiveYearGoals from "./five-year-goals/FiveYearGoals"

const Goals = () => {
  const { isDarkMode } = useAppSelector((state) => state.global)

  return (
    <section id="goals" className={isDarkMode ? "bg-161616" : "bg-222c2a"}>
      <div className="row">
        <FiveYearGoals />
        <div id="milestone-goals" className="container text-white">
          <h3 className="sectionTitle text-f3eed9" data-aos="fade-down">
            Milestone Goals
          </h3>
          <p className="sectionDesc after:bg-f3eed9" data-aos="fade-down">
            List out all of the general goals you want to complete in your life
            and order them by category. Set realistic, measurable goals that you
            can continuously improve upon. Every time you hit a milestone goal,
            replace it with a new one. You'll be surprised how far you can go.
          </p>
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="200"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Health</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
              <li className="opacity-50">Start working out again.</li>
              <li>Bulk to 170bs body weight.</li>
              <li className="opacity-50">
                Start routinely visiting the dentist again.
              </li>
              <li>Start routinely visiting the doctor.</li>
              <li>Start routinely visiting the dermatologist.</li>
              <li className="opacity-50">
                Visit the eye doctor and update glasses and contacts
                prescriptions.
              </li>
              <li className="opacity-50">Get invisalign.</li>
              <li>Quit porn for good.</li>
            </ul>
          </div>
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="400"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Career</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
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
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="600"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Financial</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
              <li className="opacity-50">Pay off student loan debts.</li>
              <li>Pay off car lease.</li>
              <li>Get back to $28,571 net worth.</li>
              <li className="opacity-50">
                Restructure budget and better organize finances.
              </li>
            </ul>
          </div>
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="800"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Intellectual</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
              <li className="opacity-50">Read 25 books.</li>
              <li className="opacity-50">Read 50 books.</li>
              <li>Start practicing guitar again.</li>
              <li className="opacity-50">Start learning Tagalog.</li>
              <li>Complete all Tagalog lessons on Pimselur.</li>
              <li className="opacity-50">
                Learn and become skilled aat blackjack basic strategy.
              </li>
            </ul>
          </div>
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="1000"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Spiritual</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
              <li className="opacity-50">Start meditating again.</li>
            </ul>
          </div>
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="1200"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Travel</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
              <li>Take a road trip across the country.</li>
              <li>Visit Europe.</li>
              <li>Visit 5 other countries.</li>
            </ul>
          </div>
          <div
            className="mb-8"
            data-aos="fade-down"
            data-aos-delay="1400"
            data-aos-anchor="#milestone-goals"
          >
            <p className="text-left underline text-2xl mb-4">Lifestyle</p>
            <ul className="list-disc text-left text-xl flex flex-col gap-4 pl-5 900:text-2xl">
              <li>Move into my own apartment / buy a house or condo.</li>
              <li>Start rebuilding wardrobe from scratch.</li>
              <li className="opacity-50">Get my next tattoo.</li>
              <li className="opacity-50">Get contact lenses.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Goals
