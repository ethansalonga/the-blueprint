import "./Header.css"

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
          <a
            href="#roles"
            className="scroll"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <div className="scroll__icon click"></div>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
