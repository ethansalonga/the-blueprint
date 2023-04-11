import { MoonIcon } from "@heroicons/react/24/solid"
import "./Header.scss"

const Header = () => {
  return (
    <header id="header">
      <div className="row">
        <div className="container container--header">
          <h2
            className="header__subtitle"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            Your standard for living life
          </h2>
          <h1 className="header__title" data-aos="fade-up">
            The Blueprint
          </h1>
          <div>
            <a
              href="#roles"
              className="scroll"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="scroll__icon"></div>
            </a>
            <button className="dark-mode__icon click">
              <MoonIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
