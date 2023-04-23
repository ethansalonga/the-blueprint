import { useAppSelector } from "../../app/hooks"
import "./Roles.css"

const Roles = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode)

  return (
    <section id="roles">
      <div className="row">
        <div
          className={`container ${
            isDarkMode ? "container--roles--dark" : "container--roles"
          }`}
        >
          <div data-aos="fade-down">
            <h3
              className={`section-title ${
                isDarkMode
                  ? "section-title--roles--dark"
                  : "section-title--roles"
              }`}
            >
              Roles
            </h3>
          </div>
          <div data-aos="fade-down">
            <p
              className={`section-desc ${
                isDarkMode ? "section-desc--roles--dark" : "section-desc--roles"
              }`}
            >
              List out the various roles you play in your life in order of
              importance. Write a short description for each role as if you had
              just passed away. We all die sometime. Remember to focus on the
              things that truly matter to you. Be the best version of yourself.
            </p>
          </div>
          <ul className="roles__list">
            <li
              data-aos="fade-down"
              data-aos-delay="200"
              data-aos-anchor="#roles"
            >
              <span className="bold">Me</span>: I want to die with no regrets
              about my life. When I die, I want to know in my own heart that I
              loved myself, that I valued myself as a person, that I was
              comfortable with who I was and that I was the most important
              person to me, not anyone else.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="400"
              data-aos-anchor="#roles"
            >
              <span className="bold">Boyfriend</span>: I want Amanda to remember
              me as the best thing in her life. I want her to say I completed
              her the same way she did for me, and that I helped make her life
              beautiful. I want her to remember me as loving, strong, and
              someone who always put her first.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="600"
              data-aos-anchor="#roles"
            >
              <span className="bold">Brother</span>: I want Bro to remember me
              as an awesome brother. I want him to remember all the good times
              we shared together and inside jokes we had. I want him to know how
              much I cared about him, and want him to believe I was always there
              for him.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="800"
              data-aos-anchor="#roles"
            >
              <span className="bold">Son</span>: I want Mom and Dad to remember
              me as a loving son who always appreciated everything they did for
              me. I want them to know how much I always loved them, even when I
              didn’t show it.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="1000"
              data-aos-anchor="#roles"
            >
              <span className="bold">Friend</span>: I want my friends to
              remember me as a genuine, good, funny guy. I want them to think
              back on all the memories and remember me fondly. I want them to
              say I was an amazing person, and someone that people always wanted
              to be around.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="1200"
              data-aos-anchor="#roles"
            >
              <span className="bold">Software Developer</span>: I want people in
              my life to remember me as a skilled and devoted software developer
              and programmer. I want to have a successful career in top tech,
              and I want everyone to realize how hard I worked to achieve this
              goal.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="1400"
              data-aos-anchor="#roles"
            >
              <span className="bold">Gym Guy</span>: I want people to remember
              me as someone who they thought was fit and healthy. I want them to
              say I cared about my body and recognize the time and dedication I
              put into being happy with my body. I want them to remember me as
              someone who took good care of their physical health.
            </li>
            <li
              data-aos="fade-down"
              data-aos-delay="1600"
              data-aos-anchor="#roles"
            >
              <span className="bold">Gamer</span>: I want everyone to remember
              me as a passionate gamer. I want people to say I was skilled at
              most games I played, and that I was always striving for first
              place and to be the best I could.
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Roles
